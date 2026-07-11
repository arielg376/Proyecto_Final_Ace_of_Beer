import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('❌ Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await register(email, password);
      alert('✅ ¡Registro exitoso! Ahora podés iniciar sesión.');
    } catch (err) {
      setError('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>📝 Registrarse</h2>
      {error && <div className="register-error">{error}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña (mínimo 6 caracteres):</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-register" disabled={loading}>
          {loading ? '⏳ Cargando...' : 'Registrarse'}
        </button>
      </form>
      <p className="register-login-link">
        ¿Ya tenés cuenta? <Link to="/login">Iniciar Sesión</Link>
      </p>

        <Link to="/" className="back-home">
        🏠 Volver al inicio
      </Link>
    </div>
  );
};

export default Register;