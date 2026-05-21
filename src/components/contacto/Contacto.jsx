import React from 'react';
import Formulario from '../formulario/Formulario';
import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-page">
      <h1 className="contacto-titulo">Contacto</h1>
      <p className="contacto-descripcion">
        ¿Tenés preguntas sobre nuestras cervezas? ¡Escribinos!
      </p>
      <Formulario />
    </div>
  );
};

export default Contacto;