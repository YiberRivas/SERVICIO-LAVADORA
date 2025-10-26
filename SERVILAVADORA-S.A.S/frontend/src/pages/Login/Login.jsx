import React from "react";
import { Link } from "react-router-dom";
import "../Registro/Registro.css";

const Login = () => {
  return (
    <div className="auth-container">
      {/* Botón para volver al inicio */}
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
              <span>LavaRenta</span>
            </div>
            <h2>Alquila Lavadoras de Alta Tecnología</h2>
            <p>Más de 5,000 clientes satisfechos confían en nuestro servicio de alquiler</p>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-bolt"></i>
                <span>Instalación en 24h</span>
              </div>
              <div className="feature">
                <i className="fas fa-tools"></i>
                <span>Mantenimiento incluido</span>
              </div>
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>Garantía total</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <i className="fas fa-star"></i>
              <span>4.9/5 Rating</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-users"></i>
              <span>5,000+ Clientes</span>
            </div>
          </div>
        </div>

        {/* Formulario de login */}
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="card-header">
              <h1>Bienvenido de nuevo</h1>
              <p>Ingresa a tu cuenta para continuar</p>
            </div>

            <form className="auth-form">
              <div className="input-group animated-input">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Correo electrónico"
                />
                <div className="input-focus"></div>
              </div>

              <div className="input-group animated-input">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Contraseña"
                />
                <div className="input-focus"></div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  Recordar sesión
                </label>
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="button" className="submit-btn">
                <span>Iniciar Sesión</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <div className="divider">
                <span>o continúa con</span>
              </div>

              <div className="social-auth">
                <button type="button" className="social-btn google">
                  <i className="fab fa-google"></i>
                  Google
                </button>
                <button type="button" className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </div>

              <div className="auth-switch">
                <p>
                  ¿No tienes una cuenta?{" "}
                  <Link to="/registro" className="switch-link">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;