import React from 'react';
import Item from '../item/Item';
import './ItemList.css';

const ItemList = ({ productos }) => {
  return (
    <div className="contenedor-tarjetas">
      {productos.map(producto => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemList;