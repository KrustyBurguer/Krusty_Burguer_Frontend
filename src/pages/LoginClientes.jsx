import { useForm } from "react-hook-form";
import axios from 'axios';
import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './LoginClientes.css';

const LoginClientes = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState(''); // Estado para los mensajes
  const { setUserType, setIsAdmin } = useAuth(); // Usa el contexto de autenticación
  const navigate = useNavigate(); // Usa useNavigate para redirigir

  const gestorFormulario = async (data) => {
    setMessage('Autenticando...');
    try {
      if (isRegistering) {
        await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/clientes`, data)
          .then((res) => {
            setMessage('Usuario registrado. Bienvenido/a a nuestra página.');
            setUserType('registered');
            setIsAdmin(false);
            setTimeout(() => navigate('/'), 3000); // Redirige después de 3 segundos
          })
          .catch((err) => {
            setMessage('Error al registrar el usuario. Inténtelo de nuevo.');
            console.log(err);
          });
      } else {
        await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/clientes/login`, {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          const user = res.data;
          setMessage(`Bienvenido/a ${user.nombre}`);
          localStorage.setItem("cliente", JSON.stringify(user));

          if (user.isAdmin) {
            setUserType('admin');
            setIsAdmin(true);
            setTimeout(() => navigate('/admin'), 3000); // Redirige después de 3 segundos
          } else {
            setUserType('registered');
            setIsAdmin(false);
            setTimeout(() => navigate('/'), 3000); // Redirige después de 3 segundos
          }
        })
        .catch((err) => {
          setMessage('Usuario no encontrado. Por favor, regístrese.');
          setIsRegistering(true); // Abre el formulario de registro
          console.log(err);
        });
      }
    } catch (err) {
      setMessage('Error en el acceso. Inténtelo de nuevo.');
      console.error("Error en el acceso", err);
    }
  };

  return (
    <div className="Form">
      <Navbar />
      <div className="inputs">
        <form className="formita" onSubmit={handleSubmit(gestorFormulario)}>
          {isRegistering && (
            <input
              type="text"
              placeholder="Nombre de Usuario"
              {...register("nombre", {
                required: "Requerido",
              })}
            />
          )}
          <input
            type="text"
            name="email"
            placeholder="email@email.com"
            {...register("email", {
              required: "Requerido",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Formato de correo incorrecto",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "Requerido",
              minLength: {
                value: 6,
                message: "Mínimo de 6 caracteres",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <button type="submit">{isRegistering ? "Registrar" : "Acceder"}</button>

          <p onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "¿Ya tienes una cuenta? Accede aquí" : "¿No tienes cuenta? Regístrate"}
          </p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginClientes;
