import { Route, Routes } from "react-router-dom";
import axios from "axios";
import React from 'react';
import Inicio from "./componentes/Inicio/Inicio";
import './App.css';
import Ejercicios from "./componentes/Ejercicios/Ejercicios";
import Entrenam from "./componentes/Entrenam/Entrenam";
import Noticias from "./componentes/Noticias/Noticias";
import About from "./componentes/About/About";
import Detail from "./componentes/Detail/Detal"
import DetailNovedad from "./componentes/DetailNovedad/Detal"
import Adm from "./componentes/Adm/Adm"
import Novedades from "./componentes/Adm/Noticias/Noticias";
import Entrena from "./componentes/Adm/Entrenam/Entrenam";

axios.defaults.baseURL = "http://localhost:3001"

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" Component={Inicio} />
          <Route path="/ejercicios" Component={Ejercicios} />
          <Route path="/entrenam" Component={Entrenam} />
          <Route path="/noticias" Component={Noticias} />
          <Route path="/about" Component={About} />
          <Route path="/adm/ejercicios" Component={Adm} />
          <Route path="/adm/entrenam" Component={Entrena} />
          <Route path="/adm/noticias" Component={Novedades} />
          <Route path="/ejercise/:id" Component={Detail} />
          <Route path="/novedad/:id" Component={DetailNovedad} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
