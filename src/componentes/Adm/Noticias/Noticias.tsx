import React, { useEffect, useState } from "react"
import axios from "axios";
import { connect } from "react-redux";
import { getAllNovedades, getNovedades } from '../../../redux/actions'
import Naav from "../Nav/Navbar";
import Paginado from "../../Paginado/Paginado";
import EjersPost from "../EjersPost/EjersPost";
import { Link } from "react-router-dom";


function Novedades(props: any) {

  const [input, setInput] = useState({
    name: "",
  })

  const [inter, setInter] = useState(false)

  const [lin, setLin] = useState(false);

  const [resp, setResp] = useState({
    mensege: ""
  })

  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina

  const [countriesPerPage] = useState(8); //cuantos dog por pagina

  const indexOfLastCountry = currentPage * countriesPerPage; 

  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  let con = props.novedades

  if(props.novedadesCopy.length > 0){
    con = props.novedadesCopy
  }

  const currentCountry = con?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    if (props.novedades[1]?.message
      === "No se encotro" || props.novedades[1]?.message
      === "resp") {
    } else {
      props.getAllNovedades()
    }
  }, [props])

  const handleInputChange = function (e: { target: { name: any; value: any; }; }) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handle = (e: any) => {
    e.preventDefault()
    props.getNovedades(input.name)
    setInput({
      name: ""
    })
  }

  const paginado = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  async function put(e: { preventDefault: () => void; }, id: any) {
    e.preventDefault();
    await axios.put("/novedades/" + id)
    await props.getAllNovedades()
    setLin(true)
  }

  const hand = (e: { preventDefault: () => void; }) =>{
    e.preventDefault()
    props.getAllNovedades()
  }

  return (
    <div className="esta">
      <header>
        <Naav />
        <button className="button" onClick={(e)=> setInter(!inter)}>Agregar Novedad</button>
        {(inter) &&
        <EjersPost/>}
        <form onSubmit={(e) => handle(e)}>
          <h5>buscar por titulo</h5>
          <button className="button" onClick={(e)=>hand(e)}>|^|</button>
          <input className="buttonf" type="text" name="name" onChange={handleInputChange} value={input.name} />
          <button className="button" type="submit">Buscar</button>
        </form>
        <h1>Novedades</h1>
        {(props.novedades[0]?.length > 0) ?
          currentCountry.map((r: { _id: any; titulo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; descripcion: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; image: string | undefined; }) =>
            <div>
              <div className="devs">
                <Link  to={`/novedad/${r._id}`}><h3 className='r'>{r.titulo}</h3></Link>
                <p className="filtro">{r.descripcion}</p>
                <button onClick={(e) => put(e, r._id)} className="button">Eliminar</button>
              </div>
            </div>
          ) : <h3>No se encuntran novedades</h3>}
          <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={con?.length}
          paginado={paginado}
        />
      </header>
    </div>
  );
}


export const mapStateToProps = (state: { novedades: any; novedadesCopy: any; }) => {
  return {
    novedades: state.novedades,
    novedadesCopy: state.novedadesCopy,
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllNovedades: () => dispatch(getAllNovedades()),
    getNovedades: (name: any) => dispatch(getNovedades(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Novedades)