import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Inicio</Link>
      <Link to="/productos" className="navbar-link">Nuestras Cervezas</Link>
      <Link to="/contacto" className="navbar-link">Contacto</Link>
      <Link to="/carrito" className="navbar-link">
        🛒 Carrito
        {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default NavBar;