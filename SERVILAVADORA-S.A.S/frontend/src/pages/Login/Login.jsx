// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/globals.css';


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.username || !formData.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/dashboard');
      } else {
        setError(result.error || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-home-btn">
        <i className="fas fa-arrow-left"></i>
        Volver al Inicio
      </Link>

      <div className="auth-wrapper">
        {/* Sección de imagen */}
        <div className="auth-hero">
          <div className="hero-content">
            <div className="hero-logo">
              <i className="fas fa-washing-machine"></i>
              <span>SERVILAVADORA</span>
            </div>
            <h2>Alquila Lavadoras de Alta Tecnología</h2>
            <p>Más de 5,000 clientes satisfechos confían en nuestro servicio de alquiler</p>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-bolt"></i>
                <span>Instalación en 24h</span>
              </div>        
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>Garantía total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de login */}
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="card-header">
              <h1>Bienvenido</h1>

      
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}
            <p>Ingresa a tu cuenta para continuar</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group animated-input">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  placeholder="Usuario"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <div className="input-focus"></div>
              </div>

              <div className="input-group animated-input">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <div className="input-focus"></div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Recordar sesión
                </label>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                <span>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
                {!loading && <i className="fas fa-arrow-right"></i>}
              </button>

              <div className="auth-switch">
                <p>
                  ¿No tienes una cuenta?{" "}
                  <Link to="/registro" className="switch-link">
                    Regístrate aquí
                  </Link>
                </p>
              </div>

              {/* Credenciales de prueba */}
              <div className="demo-credentials">
                <p className="demo-title">👉 Credenciales de prueba:</p>
                <div className="demo-list">
                  <p><strong>Admin:</strong> admin / admin123</p>
                  <p><strong>Cliente:</strong> juan / juan123</p>
                  <p><strong>Empleado:</strong> carlos / carlos123</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;