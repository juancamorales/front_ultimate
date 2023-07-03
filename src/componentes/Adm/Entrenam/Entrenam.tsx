import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import Naavbar from "../Nav/Navbar";
import { connect } from "react-redux";
import { getAllEntrenamiento, orderEntrenam } from '../../../redux/actions'
import Paginado from "../../Paginado/Paginado";


function Entrena(props: any) {

  const [lin, setLin] = useState(false);

  const [inter, setInter] = useState(false)

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina

  const [countriesPerPage] = useState(8); //cuantos dog por pagina

  const indexOfLastCountry = currentPage * countriesPerPage;

  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  let con = props.entrenamiento

  if (props.entrenamientoCopy.length > 0) {
    con = props.entrenamientoCopy
  }

  const currentCountry = con?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const [resp, setResp] = useState({
    mensege: ""
  })

  const [ejer, setEjer] = useState({
    deporte: "",
    descripcion: "",
    dia: "",
    hora: "",
    lugar: ""
  })

  useEffect(() => {
    if (props.entrenamiento[1]?.message
      === "No se encotro" || props.entrenamiento[1]?.message
      === "resp") {
    } else {
      props.getAllEntrenamiento()
    }
  }, [props])

  const paginado = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  function handleSortName(e: any) {
    e.preventDefault();
    props.orderEntrenam(e.target.value)
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Deporte ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
    const fun = () => { return setTimeout(() => { setOrder("") }, 5000) }
    fun()
  }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setEjer({
      ...ejer,
      [e.target.name]: e.target.value
    })
    setResp({
      mensege: ""
    })
  }

  async function post(e: {
    [x: string]: any; preventDefault: () => void;
  }) {
    e.preventDefault();
    const respi = await axios.post("/entrenamiento", {
      deporte: ejer.deporte,
      descripcion: ejer.descripcion,
      dia: ejer.dia,
      hora: ejer.hora,
      lugar: ejer.lugar
    })
    setResp({
      ...resp,
      mensege: respi.data.message
    })
    await props.getAllEntrenamiento()
    setEjer({
      deporte: "",
      descripcion: "",
      dia: "",
      hora: "",
      lugar: ""
    })
  }

  async function put(e: { preventDefault: () => void; }, id: any) {
    e.preventDefault();
    await axios.put("/entrenamiento/" + id)
    await props.getAllEntrenamiento()
    setLin(true)
  }

  const hand = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    props.getAllEntrenamiento()
  }

  const sort = (e: any) => {
    e.preventDefault()
    setEjer({
      ...ejer,
      deporte: e.target.value
    })
  }

  return (
    <div className="entre">
      <header>
        <Naavbar />
        <button className="buttonf" onClick={(e)=> setInter(!inter)}>Agregar Entrenamiento</button>
        {(inter) &&
          <div className="ejers">
            <h1>Nuevo Entrenaiento</h1>
            <select className="filtro"
              onChange={(e) => sort(e)}
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Entrenamiento
              </option>
              <option value="atletismo">atletismo</option>
              <option value="ultimate">ultimate</option>
              <option value="disc-golf">disc-golf</option>
            </select>
            <h5>Descripcion</h5>
            <textarea name="descripcion" className="buttonf" onChange={handleInputChange} value={ejer.descripcion}></textarea>
            <h5>Lugar</h5>
            <input className="buttonf" type="text" name="lugar" onChange={handleInputChange} value={ejer.lugar} />
            <h5>Dia</h5>
            <input className="buttonf" type="text" name="dia" onChange={handleInputChange} value={ejer.dia} />
            <h5>Hora</h5>
            <input className="buttonf" type="text" name="hora" onChange={handleInputChange} value={ejer.hora} />
            {(resp.mensege.length > 0) ?
              <h2>{resp.mensege}</h2> :
              <br></br>
            }
            {(ejer.deporte && ejer.hora && ejer.lugar && ejer.descripcion && ejer.dia) ?
              <button onClick={(e) => post(e)} className="button">Añadir</button> :
              <h5>Faltan parametros</h5>}
          </div>}
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
        <button className="button" onClick={(e) => hand(e)}>|^|</button>
        {(order) && <p className='filtro'>{order}</p>}
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
              <div className="devs2">
                <h3>{r.deporte}</h3>
                <p className="filtro">{r.descripcion}</p>
                <p className="filtro">Lugar: {r.lugar}</p>
                <p className="filtro">Dia: {r.dia}</p>
                <p className="filtro">Hora: {r.hora}</p>
                <button onClick={(e) => put(e, r._id)} className="button">Eliminar</button>
              </div>
            </div>
          ) : <h3>No se encuntran entrenamientos</h3>}
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={con?.length}
          paginado={paginado}
        />
      </header>
    </div>
  );
}

export const mapStateToProps = (state: { entrenamiento: any; entrenamientoCopy: any }) => {
  return {
    entrenamiento: state.entrenamiento,
    entrenamientoCopy: state.entrenamientoCopy,
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllEntrenamiento: () => dispatch(getAllEntrenamiento()),
    orderEntrenam: (name: any) => dispatch(orderEntrenam(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entrena)