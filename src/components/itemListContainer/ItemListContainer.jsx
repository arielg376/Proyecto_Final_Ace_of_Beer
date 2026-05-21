import React, { useState, useEffect } from 'react';
import ItemList from '../itemList/ItemList';

import './ItemListContainer.css';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔍 Intentando cargar productos...');
    
    fetch('/data/products.json')
      .then(response => {
        console.log('📡 Respuesta del servidor:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Productos cargados:', data);
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Error cargando productos:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">🍺 Cargando nuestras mejores cervezas... {error && <p>Error: {error}</p>}</div>;
  }

  if (error) {
    return <div className="loading">❌ Error: {error} - Verificar que /data/products.json exista</div>;
  }

  return (
    <div className="productos_home">
      <h1 className="titulo_home">Cerveceria Artesanal</h1>
      
      <p className="parrafo_home">
        <strong>Nacimos en el corazón de Dock Sud</strong>, entre calles que vibran con historia y espíritu obrero. Desde ahí, llevamos nuestra cerveza al mundo, con la filosofía de Motörhead como bandera: vivir sin pedir permiso, tocar fuerte, ser fiel a uno mismo.
        Porque creemos que la cerveza, como el rock, no se explica. Se siente. Se comparte. Se celebra.
        </p>
       
      <h2>Proba Nuestras Cervezas</h2>
      <ItemList productos={productos} />
      
    </div>
  );
};

export default ItemListContainer;