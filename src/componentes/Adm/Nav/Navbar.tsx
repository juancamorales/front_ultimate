import { Link } from "react-router-dom";
import "./NavBar.css";

function Naav() {
    return (
        <>
        <h4>Editar</h4>
            <ul>
                <li><Link to={`/adm/ejercicios`}>Ejercicios</Link></li>
                <li><Link to={`/adm/entrenam`}>Entrenamientos</Link></li>
                <li><Link to={`/adm/noticias`}>Novedades</Link></li>
                <li><Link to={"/"}>Atras</Link></li>
            </ul>
        </>
    )
}

export default Naav;