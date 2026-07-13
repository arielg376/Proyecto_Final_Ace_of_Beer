/*import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; 
import './NavBar.css';

const NavBar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Inicio</Link>
      {/* <Link to="/productos" className="navbar-link">Nuestras Cervezas</Link> }
      <Link to="/contacto" className="navbar-link">Contacto</Link>

      <div className="nav-auth-section">
        {user ? (
          <>
            <span className="user-email">👤 {user.email}</span>
            <button className="btn-logout" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Registro</Link>
          </>
        )}
      </div>

      <Link to="/carrito" className="navbar-link">
        🛒 Carrito
        {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default NavBar;*/


import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Inicio</Link>
      <Link to="/nosotros" className="navbar-link">Staff</Link>
      <Link to="/contacto" className="navbar-link">Contacto</Link>
      
      <div className="nav-auth-section">
        {user ? (
          <>
            <Link to="/admin" className="navbar-link admin-link">⚙️ Admin</Link>
            <span className="user-email">👤 {user.email}</span>
            <button className="btn-logout" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Registro</Link>
          </>
        )}
      </div>

      <Link to="/carrito" className="navbar-link">
        Carrito
        {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default NavBar;