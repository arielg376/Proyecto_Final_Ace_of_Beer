import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import Cart from './components/cart/Cart';
import Contacto from './components/contacto/Contacto';
import Nosotros from './components/nosotros/Nosotros';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ItemListContainer />} />
          <Route path="productos" element={<ItemListContainer />} />
          <Route path="producto/:id" element={<ItemDetailContainer />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="nosotros" element={<Nosotros />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;