// src/components/ProductoCard.jsx
import React from 'react';
import './ProductoCard.css';

const ProductoCard = ({ producto }) => {
  return (
    <div className="producto-card">
      <div className="producto-imagen-container">
        <img src={producto.foto} alt={producto.nombre} className="producto-imagen" />
      </div>
      <div className="producto-info">
        <div className="producto-header">
          <h3 className="producto-nombre">{producto.nombre}</h3>
          <div className="puntos"></div>
          <p className="producto-precio">{producto.precio}€</p>
        </div>
        <p className="producto-descripcion">{producto.descripcion}</p>
      </div>
    </div>
  );
};

export default ProductoCard;
