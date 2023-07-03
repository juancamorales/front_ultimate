import React, { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getAllEjercise, getEjercise, orderByName } from '../../redux/actions/index'
import Naav from "./Nav/Navbar";
import EjersPost from "../EjersPost/EjersPost";
import Paginado from "../Paginado/Paginado";


function Ejercicios(props: any) {

  const [input, setInput] = useState({
    name: "",
  })

  const [inter, setInter] = useState(false)

  const [order, setOrder] = useState("");

  const [lin, setLin] = useState(false);

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
    setOrder(`tipo ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 1000)}
    fun()
  }

  const handleInputChange = function (e: { target: { name: any; value: any; }; }) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  async function put(e: { preventDefault: () => void; }, id: any) {
    e.preventDefault();
    await axios.put("/ejercise/" + id)
    await props.getAllEjercise()
    setLin(true)
  }

  const hand = (e: { preventDefault: () => void; }) =>{
    e.preventDefault()
    props.getAllEjercise()
  }

  return (
    <div className="entre">
      <header>
        <Naav />
        <button className="button" onClick={(e)=> setInter(!inter)}>Agregar ejercicio</button>
        {(inter) &&
        <EjersPost />}
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
          <h5>buscar por nombre</h5>
          <button className="button" onClick={(e)=>hand(e)}>|^|</button>
          <input type="text" name="name" className="buttonf" onChange={handleInputChange} value={input.name} />
          <button type="submit" className="button">Buscar</button>
        </form>
        {(order) && <p className='filtro'>{order}</p>}
        <h1>Ejercicios</h1>
        {(props.ejercise[0]?.length > 0) ?
          currentCountry.map((r: {
            duracion: ReactNode;
            tipo: ReactNode;
            _id(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: any): void; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
          }) =>
            <div>
              <div className="devs">
                <Link to={`/ejercise/${r._id}`}><h3>{r.name}</h3></Link>
                <p className='filtro'>Tipo: {r.tipo}</p>
                <p className='filtro'>Duracion: {r.duracion}</p>
                <button onClick={(e) => put(e, r._id)} className="button">Eliminar</button>
              </div>
            </div>
          ) : <h3>No se encuntran ejercicios</h3>}
          <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={con?.length}
          paginado={paginado}
        />
      </header>
    </div>
  );
}


export const mapStateToProps = (state: { ejercise: any; ejerciseCopy: any}) => {
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