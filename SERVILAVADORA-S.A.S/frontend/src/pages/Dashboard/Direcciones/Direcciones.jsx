import React from 'react';

// ✅ CORRECTO - Exportación por defecto
const Direcciones = () => {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2 style={{color: '#062b5b', margin: 0}}>Gestión de Direcciones</h2>
        <button className="dashboard-btn">
          <i className="fas fa-plus"></i>
          Nueva Dirección
        </button>
      </div>
      
      <div className="dashboard-card">
        <h3>Direcciones Registradas</h3>
        <p>Módulo de gestión de direcciones de clientes para entregas.</p>
        <div style={{
          height: '200px',
          background: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          marginTop: '1rem'
        }}>
          Tabla de direcciones en desarrollo...
        </div>
      </div>
    </div>
  );
};

// ✅ ESTA ES LA LÍNEA CLAVE - Exportación por defecto
export default Direcciones;