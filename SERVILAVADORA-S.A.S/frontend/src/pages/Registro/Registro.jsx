import React from "react";
import { Link } from "react-router-dom";
import "../../styles/globals.css";


const Register = () => {
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
            <h2>Comienza a Alquilar Hoy</h2>
            <p>Únete a nuestra comunidad y disfruta de lavadoras premium con servicio incluido</p>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-rocket"></i>
                <span>Alta tecnología</span>
              </div>
              <div className="feature">
                <i className="fas fa-hand-holding-usd"></i>
                <span>Sin costo de instalación</span>
              </div>
              <div className="feature">
                <i className="fas fa-headset"></i>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <i className="fas fa-award"></i>
              <span>Premio a la Innovación 2024</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-truck"></i>
              <span>Entrega en toda la ciudad</span>
            </div>
          </div>
        </div>

        {/* Formulario de registro */}
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="card-header">
              <h1>Crear Cuenta</h1>
              <p>Únete a LavaRenta en menos de 2 minutos</p>
            </div>

            <form className="auth-form">
              <div className="input-group animated-input">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nombre completo"
                />
                <div className="input-focus"></div>
              </div>

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

              <div className="input-group animated-input">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirmar contraseña"
                />
                <div className="input-focus"></div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Acepto los <a href="#" className="terms-link">Términos y Condiciones</a>
                </label>
              </div>

              <button type="button" className="submit-btn">
                <span>Crear Cuenta</span>
                <i className="fas fa-user-plus"></i>
              </button>

              <div className="divider">
                <span>o regístrate con</span>
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
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="switch-link">
                    Inicia sesión aquí
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

export default Register;