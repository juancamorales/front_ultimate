import Naavbar from "../Nav/Navbar";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./about.css"

function About() {
  return (
    <div className="about">
      <header>
        <Naavbar />
        <div className="text">
          <h1>Como nacio el Ultimate</h1>
          <h5>En 1967 estudiantes de secundaria en Maplewood, New Jersey, crearon una mezcla de otros deportes como el football americano, el fútbol y el baloncesto, y se jugaba con un frisbee. Un estudiante, David Leiwant, lo denominó Ultimate, como la máxima experiencia deportiva, de aquí su nombre.</h5>
          <h1>Como llego el ultimate a Colombia</h1>
          <h5>El Ultimate Frisbee arribó a Colombia gracias a un estudiante de intercambio, Corey Tyrell, quien llegó a la Universidad de los Andes y decidió difundirlo. El 16 de abril de 2001 se creó en Bogotá la Asociación Colombiana de Ultimate Frisbee.</h5>
          <h1>Objetivo de la pagina</h1>
          <h5>hacer la comunicacion de dos deportes o mas, a un pueblo a travez de una pagina web que cominica todo relacionado sobre estos deportes tales cosas como novedades, entrenamientos y ejercicios que ayuden a estos para los que quieran practicar desde cualquier lugar</h5>
        </div>
        <h1>Creador de la pagina</h1>
        <div className="devs">
          <img src="https://i.ibb.co/gV8JGsw/Juanca.jpg"></img>
          <h3>Juan Camilo Morales</h3>
          <p className="titulo">Full Stack web Developer</p>
          <a className='Github' href='https://github.com/juancamorales' target="_blank"><FaGithub /></a>
          <a className='Linkedin' href='https://www.linkedin.com/in/juan-camilo-morales-pino-354164270/' target="_blank"><FaLinkedinIn /></a>
        </div>
        <br />
      </header>
    </div>
  );
}

export default About;