import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // ===== ESTADO DEL CARRITO =====
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  const [coupon, setCoupon] = useState(null);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = (item, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null); 
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  
  const applyCoupon = (code) => {
    const coupons = {
      'ROCK10': { discount: 0.10, name: 'ROCK10' },
      'BEER20': { discount: 0.20, name: 'BEER20' },
      'ACE50': { discount: 0.50, name: 'ACE50' },
    };

    const found = coupons[code.toUpperCase()];
    if (found) {
      setCoupon(found);
      return true;
    }
    return false;
  };

  const clearCoupon = () => {
    setCoupon(null);
  };

  const getTotalWithDiscount = () => {
    const total = getTotalPrice();
    if (coupon) {
      return total * (1 - coupon.discount);
    }
    return total;
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