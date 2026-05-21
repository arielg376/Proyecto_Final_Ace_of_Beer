import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
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
    <footer className="footer">
      <div className="footer-text">
        <p>Ace of Beer Cervecería - Cerveza artesanal con alma de Rock</p>
      </div>
      {loading ? (
        <p>Cargando equipo...</p>
      ) : (
        <div className="footer-nav">
          <ul>
            {integrantes.map(persona => (
              <li key={persona.id}>
                <Link to="/nosotros" className="footer-link">
                  👤 {persona.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="footer-text">
        <p>© 2026 - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;