import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Item.css';

const Item = ({ producto }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto, 1);
  };

  return (
    <div className="tarjetas_productos">
      <img src={`/img/${producto.imagen}`} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.estilo}</p>
      <p className="precio">${producto.precio}</p>
      <Link to={`/producto/${producto.id}`}>
        <button className="btn">Ver Detalle</button>
      </Link>
      <button className="btn" onClick={handleAddToCart}>
        Agregar al Carrito
      </button>
    </div>
  );
};

export default Item;