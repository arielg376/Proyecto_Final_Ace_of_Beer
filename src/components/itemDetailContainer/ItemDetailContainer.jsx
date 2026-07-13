import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError('ID de producto no válido');
          setLoading(false);
          return;
        }

        // 👇 ESTA ES LA LÍNEA CLAVE: BUSCA EN FIRESTORE
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProducto({ id: docSnap.id, ...data });
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAddToCart = () => {
    if (!producto) return;
    addToCart(producto, cantidad);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  if (loading) return <div className="loading">🍺 Cargando...</div>;
  if (error) return <div className="loading">❌ {error}</div>;
  if (!producto) return <div className="loading">🍺 Producto no encontrado</div>;

  return <ItemDetail producto={producto} onAddToCart={handleAddToCart} />;
};

export default ItemDetailContainer;