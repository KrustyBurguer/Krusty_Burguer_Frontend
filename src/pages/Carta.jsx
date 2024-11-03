// src/pages/Carta.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductoCard from '../components/ProductoCard';
import './Carta.css';

const Carta = ({ userType }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/productos`);
        const data = await response.json();

        if (data && data.productos) {
          setProductos(data.productos);
        } else {
          console.error('Datos de productos no encontrados:', data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const categorias = ['Hamburguesas', 'Complementos', 'Bebidas', 'Postres'];

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="carta-container">
      <Navbar userType={userType} />
      <h1 className="section-title">Nuestra Carta</h1>
      <p className="section-content">Aquí puedes ver todas nuestras hamburguesas, complementos, bebidas y postres.</p>
      {categorias.map((categoria) => {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        return (
          <section key={categoria}>
            <h2 className="section-title">{categoria}</h2>
            <div className="grid">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <ProductoCard key={producto._id} producto={producto} />
                ))
              ) : (
                <p>No hay productos en esta categoría.</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Carta;
