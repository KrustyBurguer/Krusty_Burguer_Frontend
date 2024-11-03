import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const logoUrl = "https://res.cloudinary.com/bigbossberry/image/upload/v1729699637/logo_copia_kw6qe1.png";
  const { userType, isLoggedIn, isAdmin } = useAuth(); 

  return (
    <header className="navbar-container">
      <div className="logo-container">
        <img src={logoUrl} alt="Logo Krusty Burger" className="logo" />
      </div>
      <div className="title">Krusty Burger</div>
      <nav className="navigation">
        <NavLink className={({ isActive }) => (isActive ? "navlink active" : "navlink")} to="/Inicio">
          Inicio
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "navlink active" : "navlink")} to="/carta">
          Carta
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "navlink active" : "navlink")} to="/pedidos">
          Pedidos
        </NavLink>
        {isLoggedIn && (
          <>
            {isAdmin && (
              <NavLink className={({ isActive }) => (isActive ? "navlink active" : "navlink")} to="/admin">
                Admin
              </NavLink>
            )}
            <NavLink className={({ isActive }) => (isActive ? "navlink active" : "navlink")} to="/clientes/logout">
              Logout
            </NavLink>
          </>
        )}
        {!isLoggedIn && (
          <NavLink className={({ isActive }) => (isActive ? "navlink active" : "navlink")} to="/clientes/login">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
