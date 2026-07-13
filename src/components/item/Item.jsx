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
      <img 
        src={producto.imagen || '/img/default-beer.png'} 
        alt={producto.nombre} 
      />
      <h3>{producto.nombre}</h3>
      <p>{producto.categoria || producto.estilo || 'Estilo artesanal'}</p>
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