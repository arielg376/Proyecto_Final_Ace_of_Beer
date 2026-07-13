import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ItemList from '../itemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        console.log('🔍 Cargando productos desde Firestore...');
        
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log('✅ Productos cargados:', productosList);
        setProductos(productosList);
        setError(null);
      } catch (err) {
        console.error('❌ Error al cargar productos:', err);
        setError('Error al cargar productos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <div className="loading">🍺 Cargando nuestras mejores cervezas...</div>;
  }

  if (error) {
    return <div className="loading">❌ Error: {error}</div>;
  }

  return (
    <div className="productos_home">
      <h1 className="titulo_home">Cerveceria Artesanal</h1>
      
      <p className="parrafo_home">
        <strong>Nacimos en el corazón de Dock Sud</strong>, entre calles que vibran con historia y espíritu obrero. Desde ahí, llevamos nuestra cerveza al mundo, con la filosofía de Motörhead como bandera: vivir sin pedir permiso, tocar fuerte, ser fiel a uno mismo.
        Porque creemos que la cerveza, como el rock, no se explica. Se siente. Se comparte. Se celebra.
      </p>
       
      <h2>Probá Nuestras Cervezas</h2>
      
      {productos.length === 0 ? (
        <p className="empty-message">📭 No hay productos disponibles. Agrega algunos desde el panel de administración.</p>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
};

export default ItemListContainer;