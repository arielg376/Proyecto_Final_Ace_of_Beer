import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  
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

  // ===== FUNCIONES DEL CARRITO =====
const removeFromCart = (id) => {
  setCart(prevCart => {
    const newCart = prevCart.filter(item => item.id !== id);
    // Guardar en localStorage para asegurar actualización
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  });
};

const updateQuantity = (id, quantity) => {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  
  setCart(prevCart => {
    const newCart = prevCart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  });
};

const clearCart = () => {
  setCart([]);
  setCoupon(null);
  localStorage.setItem('cart', JSON.stringify([]));
};
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const applyCoupon = async (code) => {
  try {
    const codeUpper = code.toUpperCase().trim();
    
    
    const q = query(
      collection(db, "cupones"),
      where("codigo", "==", codeUpper)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert('❌ Cupón inválido');
      return false;
    }

    const cuponData = querySnapshot.docs[0].data();
    
    setCoupon({
      discount: cuponData.descuento / 100,
      name: cuponData.codigo,
    });

    alert(`✅ Cupón ${cuponData.codigo} aplicado!`);
    return true;
  } catch (error) {
    alert('❌ Error al validar el cupón');
    return false;
  }
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