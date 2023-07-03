import { ReactNode, useEffect, useState } from "react";
import { getAllEntrenamiento, orderEntrenam } from "../../redux/actions";
import Naavbar from "../Nav/Navbar";
import { connect } from "react-redux";
import Paginado from "../Paginado/Paginado";
import "./entrenam.css"


function Entrenam(props: any) {


  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina

  const [countriesPerPage] = useState(8); //cuantos dog por pagina

  const indexOfLastCountry = currentPage * countriesPerPage; 

  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  let con = props.entrenamiento

  if(props.entrenamientoCopy.length > 0){
    con = props.entrenamientoCopy
  }

  const currentCountry = con?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    if (props.entrenamiento[1]?.message
      === "No se encotro" || props.entrenamiento[1]?.message
      === "resp") {
    } else {
      props.getAllEntrenamiento()
    }
  }, [props])

  function handleSortName(e: any) {
    e.preventDefault();
    props.orderEntrenam(e.target.value)
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Deporte ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 1000)}
    fun()
  }

  const paginado = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const hand = (e: { preventDefault: () => void; }) =>{
    e.preventDefault()
    props.getAllEntrenamiento()
  }

  return (
    <div className="entre">
      <header>
        <Naavbar />
        <select className="filtro"
            onChange={(e) => handleSortName(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Entrenamiento
            </option>
            <option value="atletismo">atletismo</option>
            <option value="ultimate">ultimate</option>
            <option value="disc-golf">disc-golf</option>
          </select>
          <button className="button" onClick={(e)=>hand(e)}>|^|</button>
          {(order) && <p className="filtro">{order}</p>}
        <h1>Entrenamientos</h1>
        {(props.entrenamiento[0]?.length > 0) ?
          currentCountry.map((r: {
            hora: ReactNode;
            dia: ReactNode;
            lugar: ReactNode;
            descripcion: ReactNode;
            deporte: ReactNode; _id: any;
          }) =>
            <div>
              <div className="devs">
                <h2 className="filtro">{r.deporte}</h2>
                <p className="filtro">{r.descripcion}</p>
                <p className="filtro"> Lugar: {r.lugar}</p>
                <p className="filtro"> Dia: {r.dia}</p>
                <p className="filtro"> Hora: {r.hora}</p>
              </div>
            </div>
          ) : <h3>No se encuntran entrenamientos</h3>}
          <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={con.length}
          paginado={paginado}
        />
      </header>
    </div>
  );
}

export const mapStateToProps = (state: { entrenamiento: any; entrenamientoCopy: any}) => {
  return {
    entrenamiento: state.entrenamiento,
    entrenamientoCopy: state.entrenamientoCopy,
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllEntrenamiento: () => dispatch(getAllEntrenamiento()),
    orderEntrenam: (name: any) => dispatch(orderEntrenam(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entrenam)