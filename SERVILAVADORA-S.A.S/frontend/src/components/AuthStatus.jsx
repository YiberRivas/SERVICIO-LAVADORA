import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthStatus = () => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="user-menu">
        <div className="dropdown">
          <a href="#usuario" className="user-info">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="user-avatar"
            />
            <span>{user.name}</span>
            <i className="fas fa-chevron-down"></i>
          </a>
          <div className="dropdown-content">
            <Link to="/perfil">
              <i className="fas fa-user"></i>
              Mi Perfil
            </Link>
            <Link to="/dashboard">
              <i className="fas fa-tachometer-alt"></i>
              Dashboard
            </Link>
            <a href="#alquileres">
              <i className="fas fa-list"></i>
              Mis Alquileres
            </a>
            <div className="dropdown-divider"></div>
            <button onClick={logout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <button onClick={demoLogin} className="demo-btn">
        <i className="fas fa-rocket"></i>
        Demo Login
      </button>
      <Link to="/login" className="btn-outline">
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default AuthStatus;