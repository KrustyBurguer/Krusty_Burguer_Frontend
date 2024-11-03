import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Inicio from "./pages/Inicio.jsx";
import Carta from "./pages/Carta.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import LoginClientes from "./pages/LoginClientes.jsx";
import Logout from "./pages/Logout.jsx";
import Admin from "./pages/Admin.jsx"; 
import { AuthProvider } from "./context/AuthContext"; 
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <NotFoundPage /> },
  { path: "/Inicio", element: <Inicio />, errorElement: <NotFoundPage /> },
  { path: "/carta", element: <Carta /> },
  { path: "/pedidos", element: <Pedidos /> },
  { path: "/clientes/login", element: <LoginClientes /> },
  { path: "/clientes/logout", element: <Logout /> },
  { path: "/admin", element: <Admin /> }, 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

