import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item, onUpdate }) => { 
  const { updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
    if (onUpdate) onUpdate(); 
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    if (onUpdate) onUpdate(); 
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.nombre}</h4>
        <p>{item.estilo || item.categoria || 'Estilo artesanal'}</p>
      </div>
      
      <div className="cart-item-price">
        ${item.precio}
      </div>
      
      <div className="cart-item-quantity">
        <button onClick={() => handleUpdateQuantity(item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleUpdateQuantity(item.quantity + 1)}>+</button>
      </div>
      
      <div className="cart-item-subtotal">
        <strong>${(item.precio * item.quantity).toFixed(2)}</strong>
        <button className="cart-item-remove" onClick={handleRemove}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;