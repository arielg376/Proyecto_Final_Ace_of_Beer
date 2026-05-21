import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../cartItem/CartItem';
import './Cart.css';

const Cart = () => {
  const { cart, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="contenedor-carrito-vacio">
        <h2 className="mensaje-carrito-vacio">🍺 Tu carrito está vacío</h2>
        <div className="acciones-carrito">
          <Link to="/productos">
            <button className="btn">Ver nuestras cervezas</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Pedido</h2>
      
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      
      <div className="total-carrito">
        <h3>Total: ${getTotalPrice()}</h3>
      </div>
      
      <div className="acciones-carrito">
        <button className="btn btn-vaciar-carrito" onClick={clearCart}>
          Vaciar Carrito
        </button>
        <button className="btn">
          Finalizar Compra 🍻
        </button>
      </div>
    </div>
  );
};

export default Cart;