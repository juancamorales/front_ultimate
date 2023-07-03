import React, { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllEjercise, getEjercise, orderByName } from '../../redux/actions/index'
import Naavbar from "../Nav/Navbar";
import Paginado from '../Paginado/Paginado';
import "./ejercicios.css"


function Ejercicios(props: any) {

  const [input, setInput] = useState({
    name: "",
  })

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina

  const [countriesPerPage] = useState(8); //cuantos dog por pagina

  const indexOfLastCountry = currentPage * countriesPerPage; 

  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  let con = props.ejercise

  if(props.ejerciseCopy.length > 0){
    con = props.ejerciseCopy
  }


  useEffect(() => {
    if (props.ejercise[1]?.message
      === "No se encotro" || props.ejercise[1]?.message
      === "resp") {
    } else {
      props.getAllEjercise()
    }
  }, [props])

  const currentCountry = con?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginado = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = function (e: { target: { name: any; value: any; }; }) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handle = (e: any) => {
    e.preventDefault()
    props.getEjercise(input.name)
    setInput({
      name: ""
    })
  }

  function handleSortName(e: any) {
    e.preventDefault();
    props.orderByName(e.target.value)
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Tipo ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 1000)}
    fun()
  }

  const hand = (e: { preventDefault: () => void; }) =>{
    e.preventDefault()
    props.getAllEjercise()
  }


  return (
    <div className="esta">
      <header>
        <Naavbar />
        <select className="filtro"
            onChange={(e) => handleSortName(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Tipo de ejercicio
            </option>
            <option value="resistencia">resistencia</option>
            <option value="aeróbico">aeróbico</option>
            <option value="flexibilidad">flexibilidad</option>
            <option value="fuerza">fuerza</option>
          </select>
        <form onSubmit={(e) => handle(e)}>
          <h5>Buscar por nombre</h5>
          <button className="button" onClick={(e)=>hand(e)}>|^|</button>
          <input type="text" name="name" onChange={handleInputChange} value={input.name} className="buttonf" />
          <button type="submit" className="button">Buscar</button>
        </form>
        {(order) && <p  className="filtro">{order}</p>}
        <h1>Ejercicios</h1>
        {(props.ejercise[0]?.length > 0) ?
          currentCountry?.map((r: {
            duracion: ReactNode;
            tipo: ReactNode;
            _id(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: any): void; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
          }) =>
            <div>
              <div className="devs">
              <Link to={`/ejercise/${r._id}`}><h3>{r.name}</h3></Link>
                <p className="filtro">Tipo: {r.tipo}</p>
                <p  className="filtro">Duracion: {r.duracion}</p>
              </div>
            </div>
          ) 
          
          : <h3>No se encuntran ejercicios</h3>}
          <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={con?.length}
          paginado={paginado}
        />
      </header>
    </div>
  );
}


export const mapStateToProps = (state: { ejercise: any; ejerciseCopy: any }) => {
  return {
    ejercise: state.ejercise,
    ejerciseCopy: state.ejerciseCopy
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllEjercise: () => dispatch(getAllEjercise()),
    getEjercise: (name: any) => dispatch(getEjercise(name)),
    orderByName: (name: any) => dispatch(orderByName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ejercicios)