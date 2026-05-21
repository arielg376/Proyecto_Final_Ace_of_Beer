import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.nombre}</h4>
        <p>{item.estilo}</p>
      </div>
      
      <div className="cart-item-price">
        ${item.precio}
      </div>
      
      <div className="cart-item-quantity">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      
      <div className="cart-item-subtotal">
        <strong>${item.precio * item.quantity}</strong>
        <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;