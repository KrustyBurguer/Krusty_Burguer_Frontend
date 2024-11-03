import React, { useState } from 'react';
import axios from 'axios';
import Imagenes from './Imagenes';

const AdminForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Hamburguesas');
  const [urlImagen, setUrlImagen] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const categorias = ["Hamburguesas", "Complementos", "Bebidas", "Postres"];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubiendo(true);
    try {
      const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        categoria,
        foto: urlImagen,
      };
      await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/productos`, nuevoProducto);
      alert('Producto subido correctamente');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCategoria('Hamburguesas');
      setUrlImagen('');
    } catch (error) {
      console.error('Error al subir el producto:', error.response ? error.response.data : error.message);
      alert('Hubo un error al subir el producto.');
    } finally {
      setSubiendo(false);
    }
  };

  const handleImageUpload = (url) => {
    setUrlImagen(url);
  };

  return (
    <div>
      <h2>Subir Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </label>
        <label>
          Categoría:
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <Imagenes setUrlImagen={setUrlImagen} onUploadComplete={handleImageUpload} />
        <button type="submit" disabled={subiendo || !urlImagen}>
          {subiendo ? 'Subiendo...' : 'Subir Producto'}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
