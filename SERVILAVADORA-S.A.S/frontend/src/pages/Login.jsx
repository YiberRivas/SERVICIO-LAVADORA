import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await onLogin(formData.username, formData.password);
    
    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Navegaciones
  const goToRegister = () => navigate('/registro');
  const goToHome = () => navigate('/');

  return (
    <div className="login-page">
      {/* 🔙 Botón fijo arriba a la izquierda */}
      <div className="top-left-button" onClick={goToHome}>
        ← Volver al inicio
      </div>

      <div className="floating-icons-login">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="login-container">
        <div className="curved-shape-login"></div>

        <div className="form-box-login">
          <h2 className="animation-login" style={{'--D': 0, '--S': 21}}>Iniciar Sesión</h2>
          
          {error && (
            <div className="alert-error-login animation-login" style={{'--D': 1, '--S': 20}}>
              <i className='bx bxs-error'></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-box-login animation-login" style={{'--D': 2, '--S': 22}}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label>Usuario</label>
              <i className='bx bxs-user'></i>
            </div>

            <div className="input-box-login animation-login" style={{'--D': 3, '--S': 23}}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Contraseña</label>
              <i className='bx bxs-lock-alt'></i>
            </div>

            <div className="input-box-login animation-login" style={{'--D': 4, '--S': 24}}>
              <button className="btn-login" type="submit" disabled={loading}>
                {loading ? 'Iniciando...' : 'Ingresar'}
              </button>
            </div>

            <div className="regi-link-login animation-login" style={{'--D': 5, '--S': 25}}>
              <p>
                ¿No tienes una cuenta? <br />
                <span onClick={goToRegister} className="link-action-login">
                  Regístrate
                </span>
              </p>
            </div>
          </form>
        </div>

        <div className="info-content-login">
          <h2 className="animation-login" style={{'--D': 0, '--S': 20}}>
            ¡BIENVENIDO DE NUEVO!
          </h2>
          <p className="animation-login" style={{'--D': 1, '--S': 21}}>
            Nos alegra tenerte de vuelta en ServiLavadora. Accede a tu cuenta para gestionar 
            tus servicios de lavado de manera rápida y sencilla.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
