import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const ItemDetail = ({ producto }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto, quantity);
    alert(`Agregaste ${quantity} ${producto.nombre} al carrito 🍺`);
  };

  // Determinar la URL de la imagen
  const getImageUrl = () => {
    if (!producto.imagen) return '/img/default-beer.png';
    
    // Si la URL ya es completa (comienza con http), usarla directamente
    if (producto.imagen.startsWith('http')) {
      return producto.imagen;
    }
    
    // Si es una ruta local, agregar /img/
    return `/img/${producto.imagen}`;
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img 
          src={getImageUrl()} 
          alt={producto.nombre} 
          className="detail-img" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/img/default-beer.png';
          }}
        />
        <div className="detail-info">
          <h1 className="detail-title">{producto.nombre}</h1>
          <p className="detail-style">{producto.estilo || producto.categoria || 'Estilo artesanal'}</p>
          <p className="detail-description">{producto.descripcion || producto.description || 'Sin descripción'}</p>
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