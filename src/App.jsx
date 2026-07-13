import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout'; // 
import ProtectedRoute from './routes/ProtectedRoute';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import Cart from './components/cart/Cart';
import Contacto from './components/contacto/Contacto';
import Nosotros from './components/nosotros/Nosotros';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductManager from './components/admin/ProductManager'; 
import './App.css';

function App() {
  return (
    <AuthProvider>
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
          
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ProductManager />} />
            <Route path="productos" element={<ProductManager />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;