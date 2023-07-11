import { Link } from "react-router-dom";

function Naavbar() {
    return (
        <>
        <h4>Que te gustaria</h4>
            <ul>
                <li><Link to={`/ejercicios`}>Ejercicios</Link></li>
                <li><Link to={`/entrenam`}>Entrenamientos</Link></li>
                <li><Link to={`/noticias`}>Novedades</Link></li>
                <li><Link to={`/about`}>Acerca de</Link></li>
                <li><Link to={"/"}>Atras</Link></li>
            </ul>
        </>
    )
}

export default Naavbar;