import React, { useState } from 'react';

const ServiciosDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 1,
      name: 'Lavadora Familiar 10kg',
      type: 'standard',
      price: 89,
      originalPrice: 109,
      status: 'available',
      rating: 4.8,
      orders: 124,
      image: '/images/lavadora-familiar.jpg'
    },
    {
      id: 2,
      name: 'Lavadora Compacta 8kg',
      type: 'compact',
      price: 59,
      originalPrice: 79,
      status: 'available',
      rating: 4.5,
      orders: 89,
      image: '/images/lavadora-compacta.jpg'
    },
    {
      id: 3,
      name: 'Lavadora Premium 12kg',
      type: 'premium',
      price: 129,
      originalPrice: 159,
      status: 'maintenance',
      rating: 4.9,
      orders: 67,
      image: '/images/lavadora-premium.jpg'
    },
    {
      id: 4,
      name: 'Lavadora Industrial 15kg',
      type: 'industrial',
      price: 199,
      originalPrice: 249,
      status: 'available',
      rating: 4.7,
      orders: 45,
      image: '/images/lavadora-industrial.jpg'
    }
  ];

  const stats = {
    total: services.length,
    available: services.filter(s => s.status === 'available').length,
    inMaintenance: services.filter(s => s.status === 'maintenance').length,
    totalRevenue: 12458
  };

  return (
    <div className="services-section">
      {/* Header */}
      <div className="section-header">
        <div className="header-content">
          <h1>Gestión de Servicios</h1>
          <p>Administra las lavadoras disponibles para alquiler</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i>
          Agregar Servicio
        </button>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-tshirt"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Servicios</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.available}</div>
            <div className="stat-label">Disponibles</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-tools"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.inMaintenance}</div>
            <div className="stat-label">En Mantenimiento</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">${stats.totalRevenue}</div>
            <div className="stat-label">Ingresos Totales</div>
          </div>
        </div>
      </div>

      {/* Tabs de Navegación */}
      <div className="tabs-navigation">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todos los Servicios
        </button>
        <button 
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Disponibles
        </button>
        <button 
          className={`tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          En Mantenimiento
        </button>
        <button 
          className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Más Populares
        </button>
      </div>

      {/* Grid de Servicios */}
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-image">
              <img src={service.image} alt={service.name} />
              <div className="service-badge">
                {service.type === 'premium' ? 'PREMIUM' : 
                 service.type === 'industrial' ? 'INDUSTRIAL' : 
                 service.type === 'compact' ? 'COMPACTA' : 'ESTÁNDAR'}
              </div>
              {service.status === 'maintenance' && (
                <div className="maintenance-overlay">
                  <i className="fas fa-tools"></i>
                  En Mantenimiento
                </div>
              )}
            </div>

            <div className="service-content">
              <h3 className="service-name">{service.name}</h3>
              
              <div className="service-rating">
                <div className="stars">
                  {'★'.repeat(Math.floor(service.rating))}
                  <span style={{opacity: 0.3}}>
                    {'★'.repeat(5 - Math.floor(service.rating))}
                  </span>
                </div>
                <span className="rating-value">{service.rating}</span>
                <span className="orders-count">({service.orders} pedidos)</span>
              </div>

              <div className="service-price">
                <span className="current-price">${service.price}/mes</span>
                <span className="original-price">${service.originalPrice}/mes</span>
              </div>

              <div className="service-features">
                <span className="feature">
                  <i className="fas fa-bolt"></i>
                  A++ Eficiencia
                </span>
                <span className="feature">
                  <i className="fas fa-truck"></i>
                  Entrega Incluida
                </span>
              </div>

              <div className="service-actions">
                <button className="btn btn-primary btn-sm">
                  <i className="fas fa-edit"></i>
                  Editar
                </button>
                <button className="btn btn-outline btn-sm">
                  <i className="fas fa-chart-bar"></i>
                  Estadísticas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosDashboard;