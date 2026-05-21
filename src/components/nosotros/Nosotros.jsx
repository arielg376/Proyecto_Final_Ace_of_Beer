import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nosotros.css';

const Nosotros = () => {
  const [integrantes, setIntegrantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then(response => response.json())
      .then(data => {
        setIntegrantes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando integrantes:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="nosotros-container">
      <h1 className="nosotros-titulo">Nuestro Equipo</h1>
      <p className="nosotros-descripcion">
        Conocé a las personas que hacen posible Ace of Base Cervecería
      </p>
      
      {loading ? (
        <div className="loading">🍺 Cargando equipo...</div>
      ) : (
        <div className="nosotros-grid">
          {integrantes.map(persona => (
            <div key={persona.id} className="nosotros-card">
              <div className="nosotros-foto">
                <img 
                  src={`/img/${persona.foto}`} 
                  alt={persona.nombre}
                  className="nosotros-img"
                />
              </div>
              <h3>{persona.nombre}</h3>
              <p className="nosotros-rol">{persona.rol}</p>
              <p className="nosotros-hobby">{persona.hobby}</p>
              <a href={`mailto:${persona.email}`} className="nosotros-email">
                {persona.email}
              </a>
            </div>
          ))}
        </div>
      )}
      
      <div className="nosotros-volver">
        <Link to="/">
          <button className="btn">← Volver al Inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default Nosotros;