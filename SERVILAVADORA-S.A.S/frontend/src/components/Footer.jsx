// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🧺 SERVILAVADORA</h3>
            <p className="text-gray-400">
              Tu servicio de alquiler de lavadoras más confiable
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/servicios" className="hover:text-white">Servicios</a></li>
              <li><a href="/soporte" className="hover:text-white">Soporte</a></li>
              <li><a href="/login" className="hover:text-white">Iniciar Sesión</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +57 310 123 4567</li>
              <li>📧 info@servilavadora.com</li>
              <li>📍 Quibdó, Colombia</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 SERVILAVADORA S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;