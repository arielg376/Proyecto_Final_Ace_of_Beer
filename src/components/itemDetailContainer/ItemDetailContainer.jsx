import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProducto(found);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando producto:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">🍺 Cargando detalles de la cerveza...</div>;
  }

  if (!producto) {
    return <div className="loading">❌ Producto no encontrado</div>;
  }

  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;