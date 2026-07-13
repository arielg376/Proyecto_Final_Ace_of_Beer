import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(null);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = (item, quantity) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
  };

  
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  
  const getTotalItems = () => cart.reduce((t, i) => t + i.quantity, 0);
  const getTotalPrice = () => cart.reduce((t, i) => t + (i.precio * i.quantity), 0);

  
  const applyCoupon = async (code) => {
    try {
      const q = query(collection(db, "cupones"), where("codigo", "==", code.toUpperCase().trim()));
      const snap = await getDocs(q);
      if (snap.empty) return false;
      const data = snap.docs[0].data();
      setCoupon({ discount: data.descuento / 100, name: data.codigo });
      return true;
    } catch {
      return false;
    }
  };

  const clearCoupon = () => setCoupon(null);
  const getTotalWithDiscount = () => {
    const total = getTotalPrice();
    return coupon ? total * (1 - coupon.discount) : total;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      coupon,
      applyCoupon,
      clearCoupon,
      getTotalWithDiscount,
    }}>
      {children}
    </CartContext.Provider>
  );
};