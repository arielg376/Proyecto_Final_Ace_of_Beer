import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../cartItem/CartItem';
import './Cart.css';

const Cart = () => {
  const { 
    cart, 
    getTotalPrice, 
    clearCart,
    coupon, 
    applyCoupon, 
    clearCoupon, 
    getTotalWithDiscount 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  // Manejar aplicación de cupón
  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      setCouponMessage(`✅ Cupón ${couponCode} aplicado!`);
      setCouponCode('');
      setTimeout(() => setCouponMessage(''), 3000);
    } else {
      setCouponMessage('❌ Cupón inválido. Prueba: ROCK10, BEER20 o ACE50');
      setTimeout(() => setCouponMessage(''), 3000);
    }
  };

  // Manejar eliminación de cupón
  const handleClearCoupon = () => {
    clearCoupon();
    setCouponMessage('Cupón eliminado');
    setTimeout(() => setCouponMessage(''), 3000);
  };

  // Si el carrito está vacío
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
      <h2 className="cart-title">🍺 Tu Pedido</h2>
      
      {/* Lista de productos */}
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      
      {/* 👇 SECCIÓN DE CUPONES (NUEVO) */}
      <div className="coupon-section">
        <input
          type="text"
          className="coupon-input"
          placeholder="🎟️ Código de cupón (ROCK10, BEER20, ACE50)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="btn-coupon" onClick={handleApplyCoupon}>
          Aplicar Cupón
        </button>
        {coupon && (
          <button className="btn-clear-coupon" onClick={handleClearCoupon}>
            ✖ Eliminar
          </button>
        )}
      </div>

      {/* Mensaje del cupón */}
      {couponMessage && <div className="coupon-message">{couponMessage}</div>}

      {/* Información del cupón aplicado */}
      {coupon && (
        <div className="coupon-info">
          <p>🎉 Cupón <strong>{coupon.name}</strong> aplicado!</p>
          <p>Descuento del <strong>{coupon.discount * 100}%</strong></p>
        </div>
      )}

      {/* Resumen del carrito */}
      <div className="total-carrito">
        <div className="total-line">
          <span>Subtotal:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        {coupon && (
          <div className="total-line descuento">
            <span>Descuento ({coupon.discount * 100}%):</span>
            <span>-${(getTotalPrice() - getTotalWithDiscount()).toFixed(2)}</span>
          </div>
        )}
        <div className="total-line grand-total">
          <span>Total a pagar:</span>
          <span><strong>${getTotalWithDiscount().toFixed(2)}</strong></span>
        </div>
      </div>
      
      {/* Acciones del carrito */}
      <div className="acciones-carrito">
        <button className="btn btn-vaciar-carrito" onClick={() => {
          clearCart();
          clearCoupon(); 
        }}>
          Vaciar Carrito
        </button>
        <button className="btn btn-checkout" onClick={() => alert('🚀 Funcionalidad en desarrollo')}>
          Finalizar Compra 🍻
        </button>
        <Link to="/productos">
          <button className="btn btn-continue">
            Seguir Comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;