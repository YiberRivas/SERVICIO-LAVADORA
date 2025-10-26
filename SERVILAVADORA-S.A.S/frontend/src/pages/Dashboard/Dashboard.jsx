import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Componentes del Dashboard
import DashboardHome from "./DashboardHome/DashboardHome";
import AgendaDashboard from "./Agenda/AgendaDashboard";
import Usuarios from "./Usuarios/Usuarios";
import ServiciosDashboard from "./Servicios/ServiciosDashboard";
import Facturas from "./Facturas/Facturas";
import PagosDashboard from "./Pagos/PagosDashboard";
import Direcciones from "./Direcciones/Direcciones";
import Reportes from "./Reportes/Reportes";
import Roles from "./Roles/Roles";
import TutorialesDashboard from "./Tutoriales/TutorialesDashboard";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { path: '/dashboard', icon: 'fas fa-chart-line', label: 'Dashboard', component: DashboardHome },
    { path: '/dashboard/agenda', icon: 'fas fa-calendar-alt', label: 'Agenda', component: AgendaDashboard },
    { path: '/dashboard/usuarios', icon: 'fas fa-users', label: 'Usuarios', component: Usuarios },
    { path: '/dashboard/servicios', icon: 'fas fa-concierge-bell', label: 'Servicios', component: ServiciosDashboard },
    { path: '/dashboard/facturas', icon: 'fas fa-file-invoice', label: 'Facturas', component: Facturas },
    { path: '/dashboard/pagos', icon: 'fas fa-credit-card', label: 'Pagos', component: PagosDashboard },
    { path: '/dashboard/direcciones', icon: 'fas fa-map-marker-alt', label: 'Direcciones', component: Direcciones },
    { path: '/dashboard/reportes', icon: 'fas fa-chart-bar', label: 'Reportes', component: Reportes },
    { path: '/dashboard/roles', icon: 'fas fa-user-shield', label: 'Roles', component: Roles },
    { path: '/dashboard/tutoriales', icon: 'fas fa-book', label: 'Tutoriales', component: TutorialesDashboard },
  ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Overlay para móvil */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-spa"></i>
            {sidebarOpen && <span>LavaRenta</span>}
          </div>
          <button 
            className="sidebar-toggle" 
            onClick={toggleSidebar}
          >
            <i className={`fas fa-chevron-${sidebarOpen ? 'left' : 'right'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
            >
              <i className={item.icon}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item" 
            onClick={() => navigate('/')}
            style={{background: 'none', border: 'none', width: '100%'}}
          >
            <i className="fas fa-arrow-left"></i>
            {sidebarOpen && <span>Volver al sitio</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            <div>
              <h1>{getPageTitle()}</h1>
              <p>Panel administrativo</p>
            </div>
          </div>
          <div className="user-menu">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
              alt="Admin"
              className="user-avatar"
            />
            <div className="user-info">
              <div className="user-name">Administrador</div>
              <div className="user-role">Super Admin</div>
            </div>
          </div>
        </header>

        <section className="dashboard-content">
          <Routes>
            {menuItems.map((item) => (
              <Route
                key={item.path}
                path={item.path.replace('/dashboard', '')}
                element={<item.component />}
              />
            ))}
            <Route path="/" element={<DashboardHome />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;