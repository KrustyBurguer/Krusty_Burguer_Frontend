// Importaciones necesarias para el servidor y el frontend
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Inicio from './pages/Inicio.jsx';
import Carta from './pages/Carta.jsx';
import Pedidos from './pages/Pedidos.jsx';
import LoginClientes from './pages/LoginClientes.jsx';
import Logout from './pages/Logout.jsx';
import Admin from './pages/Admin.jsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Configuración del servidor Express
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para manejar todas las solicitudes y devolver el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configuración del frontend de React
const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <NotFoundPage /> },
  { path: '/Inicio', element: <Inicio />, errorElement: <NotFoundPage /> },
  { path: '/carta', element: <Carta /> },
  { path: '/pedidos', element: <Pedidos /> },
  { path: '/clientes/login', element: <LoginClientes /> },
  { path: '/clientes/logout', element: <Logout /> },
  { path: '/admin', element: <Admin /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
