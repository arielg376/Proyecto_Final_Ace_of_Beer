import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const ItemDetail = ({ producto }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto, quantity);
    alert(`Agregaste ${quantity} ${producto.nombre} al carrito 🍺`);
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img src={`/img/${producto.imagen}`} alt={producto.nombre} className="detail-img" />
        <div className="detail-info">
          <h1 className="detail-title">{producto.nombre}</h1>
          <p className="detail-style">{producto.estilo}</p>
          <p className="detail-description">{producto.descripcion}</p>
          <p className="detail-price">${producto.precio}</p>
          <p className="detail-stock">Stock disponible: {producto.stock}</p>
          
          <div className="detail-quantity">
            <label>Cantidad: </label>
            <input
              type="number"
              min="1"
              max={producto.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="detail-qty-input"
            />
          </div>
          
          <button className="btn" onClick={handleAddToCart}>
            Agregar al Carrito ({quantity} unidad/es)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;