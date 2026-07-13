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
    getTotalWithDiscount,
    removeFromCart,
    updateQuantity
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [msg, setMsg] = useState('');
  const [key, setKey] = useState(0);

  
  const forceUpdate = () => {
    setKey(prev => prev + 1);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setMsg('❌ Ingresa un código');
      setTimeout(() => setMsg(''), 3000);
      return;
    }
    const ok = await applyCoupon(couponCode);
    setMsg(ok ? `✅ Cupón ${couponCode} aplicado!` : '❌ Cupón inválido');
    if (ok) setCouponCode('');
    setTimeout(() => setMsg(''), 3000);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="contenedor-carrito-vacio">
        <h2 className="mensaje-carrito-vacio">🍺 Tu carrito está vacío</h2>
        <div className="acciones-carrito">
          <Link to="/productos"><button className="btn">Ver cervezas</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container" key={key}>
      <h2 className="cart-title">🍺 Tu Pedido</h2>
      
      
      {cart.map(item => (
        <CartItem 
          key={item.id} 
          item={item} 
          onUpdate={forceUpdate} 
        />
      ))}
      
      <div className="coupon-section">
        <input type="text" className="coupon-input" placeholder="🎟️ Código" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        <button className="btn-coupon" onClick={handleApplyCoupon}>Aplicar</button>
        {coupon && <button className="btn-clear-coupon" onClick={() => { clearCoupon(); setMsg('Cupón eliminado'); setTimeout(() => setMsg(''), 3000); }}>✖</button>}
      </div>

      {msg && <div className="coupon-message">{msg}</div>}
      {coupon && <div className="coupon-info">🎉 Cupón <strong>{coupon.name}</strong> - {coupon.discount * 100}%</div>}

      <div className="total-carrito">
        <div className="total-line"><span>Subtotal:</span><span>${getTotalPrice().toFixed(2)}</span></div>
        {coupon && <div className="total-line descuento"><span>Descuento:</span><span>-${(getTotalPrice() - getTotalWithDiscount()).toFixed(2)}</span></div>}
        <div className="total-line grand-total"><span>Total:</span><span><strong>${getTotalWithDiscount().toFixed(2)}</strong></span></div>
      </div>
      
      <div className="acciones-carrito">
        <button className="btn btn-vaciar-carrito" onClick={() => { clearCart(); clearCoupon(); setKey(k => k + 1); }}>Vaciar</button>
        <button className="btn btn-checkout" onClick={() => alert('🚀 Funcionalidad en desarrollo')}>Finalizar</button>
        <Link to="/productos"><button className="btn btn-continue">Seguir</button></Link>
      </div>
    </div>
  );
};

export default Cart;