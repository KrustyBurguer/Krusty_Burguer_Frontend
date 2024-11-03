import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Inicio.css';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <Navbar />
      <div className="contenido">
        <div className="texto-animado">
          <h1 className="titulo fondo-translucido">¡Bienvenidos a Krusty Burger!</h1>
          <p className="descripcion fondo-translucido">Descubre nuestras deliciosas hamburguesas gourmet, hechas con los ingredientes más frescos y de la mejor calidad.</p>
          <Link to="/carta" className="cta-button fondo-translucido">Empieza tu aventura de sabor aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
