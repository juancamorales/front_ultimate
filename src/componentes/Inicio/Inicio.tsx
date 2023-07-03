import { useState } from "react";
import { Link } from "react-router-dom";
import "./inicio.css"

function Inicio() {

  const [ ejer, setEjer] = useState("")

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setEjer(e.target.value)
  }


  return (
    <div className="loginContainer">
      <header>
        <h1>Ultimate</h1>
        <Link to={"/ejercicios"}><button className="button">Inicio</button></Link>
        <br />
        <br />
        <br />
        <label htmlFor="name" className="er">Entrar como Aministrador</label>
        <input type="text" name="titulo" onChange={handleInputChange} className="buttonf" />
        <br />
        <br />
        <br />
        {( ejer === "culo") ? 
        <Link to={"/adm/ejercicios"}><button className="button">Adm</button></Link> :
        <br />}
      </header>
    </div>
  );
}

export default Inicio;