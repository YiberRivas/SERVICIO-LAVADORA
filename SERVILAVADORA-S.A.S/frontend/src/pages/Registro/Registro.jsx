// src/pages/Registro/Registro.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Registro.css';


const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    const { username, password, confirmPassword, nombres, apellidos, correo, telefono } = formData;

    if (!username || !password || !confirmPassword || !nombres || !apellidos || !correo || !telefono) {
      setError('Por favor completa todos los campos');
      return false;
    }

    if (username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return false;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    const payload = {
      username: formData.username,
      password: formData.password,
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      correo: formData.correo,
      telefono: formData.telefono
    };

    const result = await register(payload);

    if (result.success) {
      alert('✅ Registro exitoso! Redirigiendo al login...');
      navigate('/login');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-home-btn">
        <i className="fas fa-arrow-left"></i>
        Volver al Inicio
      </Link>

      <div className="auth-wrapper">
        <div className="auth-hero">
          <div className="hero-content">
            <div className="hero-logo">
              <i className="fas fa-washing-machine"></i>
              <span>SERVILAVADORA</span>
            </div>
            <h2>Comienza a Alquilar Hoy</h2>
            <p>Únete a nuestra comunidad</p>
          </div>
        </div>

        <div className="auth-form-container">
          <div className="auth-card">
            <div className="card-header">
              <h1>Crear Cuenta</h1>
              <p>Completa tus datos</p>
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group animated-input">
                <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} />
              </div>

              <div className="input-group animated-input">
                <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} />
              </div>

              <div className="input-group animated-input">
                <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} />
              </div>

              <div className="input-group animated-input">
                <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
              </div>

              <div className="input-group animated-input">
                <input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} />
              </div>

              <div className="input-group animated-input">
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
              </div>

              <div className="input-group animated-input">
                <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} />
              </div>

              <label className="checkbox-container">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                Acepto los términos y condiciones
              </label>

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </button>

              <p className="auth-switch">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Registro;
