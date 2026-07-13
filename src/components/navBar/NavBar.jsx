import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const totalItems = getTotalItems();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      {/* Botón hamburguesa */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Enlaces del menú */}
      <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
      <Link to="/nosotros" className="navbar-link" onClick={() => setMenuOpen(false)}>Staff</Link>
      <Link to="/contacto" className="navbar-link" onClick={() => setMenuOpen(false)}>Contacto</Link>
      
      <div className="nav-auth-section" onClick={() => setMenuOpen(false)}>
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

      <Link to="/carrito" className="navbar-link" onClick={() => setMenuOpen(false)}>
        Carrito
        {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default NavBar;