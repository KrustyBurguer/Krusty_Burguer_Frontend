import React, { useState } from 'react'; // Importa useState
import axios from "axios";

const Imagenes = ({ setUrlImagen, onUploadComplete }) => {
  const [urlImagen, setInternalUrlImagen] = useState('');

  const subeImagen = (e) => {
    console.log(e.target.files);
    const imagen = e.target.files[0];
    const formImagen = new FormData();
    formImagen.append("file", imagen);
    formImagen.append("upload_preset", "h4spjwow");

    axios
      .post("https://api.cloudinary.com/v1_1/franio/image/upload", formImagen)
      .then((res) => {
        const imageUrl = res.data.url;
        setInternalUrlImagen(imageUrl);
        setUrlImagen(imageUrl);
        onUploadComplete(imageUrl);
      })
      .catch((err) => {
        console.error("Error subiendo la imagen:", err);
      });
  };

  return (
    <div>
      <input type="file" name="file" id="file" onChange={subeImagen} />
      {urlImagen && (
        <div>
          <p>Imagen subida correctamente:</p>
          <img src={urlImagen} alt="Imagen subida" style={{ width: '150px' }} />
        </div>
      )}
    </div>
  );
};

export default Imagenes;
