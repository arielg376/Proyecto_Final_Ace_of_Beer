import React, { useState } from 'react';
import './Formulario.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    consulta: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🍺 ¡Gracias ${formData.nombre}! Te contactaremos sobre nuestras cervezas.`);
    setFormData({ nombre: '', email: '', consulta: '' });
  };

  return (
    <section className="seccion-contacto">
      <h2 className="titulo-contacto">Contacto</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="campo-contacto">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="campo-contacto">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="campo-contacto">
          <label>Consulta:</label>
          <textarea
            name="consulta"
            rows="4"
            value={formData.consulta}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Enviar Consulta 🍺</button>
      </form>
    </section>
  );
};

export default Formulario;