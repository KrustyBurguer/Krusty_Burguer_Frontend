import React from 'react';
import Navbar from '../components/Navbar';
import AdminForm from '../components/AdminForm';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import "./Admin.css";

const Admin = () => {
  const { userType } = useAuth(); // Usa el contexto de autenticación

  if (userType !== 'admin') {
    return <p>No tienes acceso a esta página.</p>;
  }

  return (
    <div className="admin-container">
      <Navbar userType={userType} />
      <div className="contenido-admin">
        <h1 className="titulo-admin">Panel de Administración</h1>
        <p>Actualización de productos.</p>
        <AdminForm userType={userType} />
      </div>
    </div>
  );
};

export default Admin;
