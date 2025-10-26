// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🧺</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SERVILAVADORA</h1>
              <p className="text-xs text-gray-500">Alquiler a domicilio</p>
            </div>
          </div>

          {/* Navegación Principal */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-[var(--primary)] font-medium">Inicio</a>
            <a href="/servicios" className="text-gray-700 hover:text-[var(--primary)] font-medium">Servicios</a>
            <a href="/agenda" className="text-gray-700 hover:text-[var(--primary)] font-medium">Agendar</a>
            <a href="/tutoriales" className="text-gray-700 hover:text-[var(--primary)] font-medium">Cómo funciona</a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-[var(--primary)] font-medium">Iniciar Sesión</a>
            <a href="/registro" className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Registrarse
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;