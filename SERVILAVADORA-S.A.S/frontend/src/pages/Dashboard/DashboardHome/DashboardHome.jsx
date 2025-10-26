import React from 'react';
import LineChart from "../../../components/Charts/LineChart";
import BarChart from "../../../components/Charts/BarChart";
import DoughnutChart from "../../../components/Charts/DoughnutChart";

import './DashboardHome.css';

const DashboardHome = () => {
  // Datos para las tarjetas de métricas
  const metrics = [
    {
      title: 'Ingresos Totales',
      value: '$12,458',
      change: '+12.5%',
      positive: true,
      icon: 'fas fa-dollar-sign'
    },
    {
      title: 'Servicios Activos',
      value: '1,248',
      change: '+8.2%',
      positive: true,
      icon: 'fas fa-concierge-bell'
    },
    {
      title: 'Clientes Nuevos',
      value: '324',
      change: '+5.7%',
      positive: true,
      icon: 'fas fa-users'
    },
    {
      title: 'Tasa de Finalización',
      value: '94.2%',
      change: '+2.1%',
      positive: true,
      icon: 'fas fa-check-circle'
    }
  ];

  // Datos para el gráfico de ingresos mensuales
  const revenueData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ingresos 2024',
        data: [8500, 9200, 7800, 11000, 12500, 14200, 13800, 15200, 14800, 16200, 15800, 17400],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Ingresos 2023',
        data: [7200, 6800, 8100, 8900, 9500, 10200, 9800, 11000, 11500, 12200, 11800, 12500],
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Datos para el gráfico de servicios más populares
  const servicesData = {
    labels: ['Lavado Básico', 'Lavado Premium', 'Planchado', 'Limpieza Profunda', 'Secado Express'],
    datasets: [
      {
        label: 'Servicios Realizados',
        data: [320, 280, 180, 150, 120],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de estado de agendamientos
  const statusData = {
    labels: ['Completados', 'En Proceso', 'Pendientes', 'Cancelados'],
    datasets: [
      {
        label: 'Estados de Servicios',
        data: [65, 15, 12, 8],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de satisfacción
  const satisfactionData = {
    labels: ['5 Estrellas', '4 Estrellas', '3 Estrellas', '2 Estrellas', '1 Estrella'],
    datasets: [
      {
        label: 'Calificaciones',
        data: [45, 30, 15, 7, 3],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="dashboard-home">
      {/* Métricas Principales */}
      <div className="dashboard-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-header">
              <div className="card-title">{metric.title}</div>
              <div className="card-icon">
                <i className={metric.icon}></i>
              </div>
            </div>
            <div className="card-value">{metric.value}</div>
            <div className={`card-change ${metric.positive ? 'positive' : 'negative'}`}>
              <i className={`fas fa-arrow-${metric.positive ? 'up' : 'down'}`}></i>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos Principales */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Ingresos Mensuales</h3>
            <div className="chart-actions">
              <button className="btn btn-outline btn-sm">2024</button>
              <button className="btn btn-outline btn-sm">2023</button>
            </div>
          </div>
          <LineChart 
            data={revenueData} 
            title="Evolución de Ingresos Mensuales" 
          />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Estado de Servicios</h3>
          </div>
          <DoughnutChart 
            data={statusData} 
            title="Distribución de Estados" 
          />
        </div>
      </div>

      {/* Segunda Fila de Gráficos */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Servicios Más Populares</h3>
          </div>
          <BarChart 
            data={servicesData} 
            title="Servicios Más Solicitados" 
          />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Satisfacción del Cliente</h3>
          </div>
          <BarChart 
            data={satisfactionData} 
            title="Calificaciones de Servicios" 
          />
        </div>
      </div>

      {/* Tabla de Últimos Servicios */}
      <div className="data-table">
        <div className="table-header">
          <h3 className="table-title">Últimos Servicios Agendados</h3>
          <div className="table-actions">
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-download"></i>
              Exportar
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>María González</td>
                <td>Lavado Premium</td>
                <td>15 Nov 2024</td>
                <td>$85.00</td>
                <td><span className="status-badge status-completed">Completado</span></td>
              </tr>
              <tr>
                <td>Carlos Rodríguez</td>
                <td>Planchado Express</td>
                <td>14 Nov 2024</td>
                <td>$45.00</td>
                <td><span className="status-badge status-active">En Proceso</span></td>
              </tr>
              <tr>
                <td>Ana Martínez</td>
                <td>Limpieza Profunda</td>
                <td>14 Nov 2024</td>
                <td>$120.00</td>
                <td><span className="status-badge status-pending">Pendiente</span></td>
              </tr>
              <tr>
                <td>Juan Pérez</td>
                <td>Lavado Básico</td>
                <td>13 Nov 2024</td>
                <td>$60.00</td>
                <td><span className="status-badge status-completed">Completado</span></td>
              </tr>
              <tr>
                <td>Laura Sánchez</td>
                <td>Secado Express</td>
                <td>13 Nov 2024</td>
                <td>$35.00</td>
                <td><span className="status-badge status-cancelled">Cancelado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;