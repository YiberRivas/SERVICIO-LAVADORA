import React, { useState } from 'react';
import '../assets/Login.css'; // Puedes crear Registro.css si quieres estilos diferentes

const Registro = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    persona_id: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password_hash: formData.password,
          persona_id: parseInt(formData.persona_id)
        })
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      setSuccess('Usuario registrado exitosamente');
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        persona_id: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Botón Volver al Login */}
      <button
        onClick={onNavigateToLogin}
        className="btn-volver"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        ← Volver
      </button>

      <div className="login-container">
        <div className="curved-shape-login"></div>

        <div className="form-box-login">
          <h2 className="animation-login" style={{ '--D': 0, '--S': 21 }}>
            Crear Cuenta
          </h2>

          {error && (
            <div className="alert-error-login animation-login" style={{ '--D': 1, '--S': 20 }}>
              <i className='bx bxs-error'></i> {error}
            </div>
          )}
          {success && (
            <div className="alert-success-login animation-login" style={{ '--D': 1, '--S': 20 }}>
              <i className='bx bxs-check-circle'></i> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-box-login animation-login" style={{ '--D': 2, '--S': 22 }}>
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

            <div className="input-box-login animation-login" style={{ '--D': 3, '--S': 23 }}>
              <input
                type="number"
                name="persona_id"
                value={formData.persona_id}
                onChange={handleChange}
                required
              />
              <label>ID Persona</label>
              <i className='bx bxs-id-card'></i>
            </div>

            <div className="input-box-login animation-login" style={{ '--D': 4, '--S': 24 }}>
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

            <div className="input-box-login animation-login" style={{ '--D': 5, '--S': 25 }}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirmar Contraseña</label>
              <i className='bx bxs-lock'></i>
            </div>

            <div className="input-box-login animation-login" style={{ '--D': 6, '--S': 26 }}>
              <button className="btn-login" type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        </div>

        <div className="info-content-login">
          <h2 className="animation-login" style={{ '--D': 0, '--S': 20 }}>
            ¡ÚNETE A SERVILAVADORA!
          </h2>
          <p className="animation-login" style={{ '--D': 1, '--S': 21 }}>
            Crea tu cuenta para comenzar a disfrutar de nuestros servicios de lavado de forma fácil y rápida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
