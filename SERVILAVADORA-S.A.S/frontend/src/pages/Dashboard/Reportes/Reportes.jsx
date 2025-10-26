import React, { useState } from 'react';
import LineChart from "../../../components/Charts/LineChart";
import BarChart from "../../../components/Charts/BarChart";
import DoughnutChart from "../../../components/Charts/DoughnutChart";


const Reportes = () => {
  const [dateRange, setDateRange] = useState('month');

  const revenueByServiceData = {
    labels: ['Lavado Básico', 'Lavado Premium', 'Planchado', 'Limpieza Profunda', 'Secado Express'],
    datasets: [
      {
        label: 'Ingresos por Servicio ($)',
        data: [12500, 18500, 8400, 15600, 6800],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const clientGrowthData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Clientes Nuevos',
        data: [28, 32, 45, 38, 52, 48, 65, 72, 68, 85, 78, 92],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const paymentMethodsData = {
    labels: ['Tarjeta Crédito', 'Tarjeta Débito', 'Efectivo', 'Transferencia', 'Digital'],
    datasets: [
      {
        label: 'Métodos de Pago',
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="reportes-page">
      <div className="page-header">
        <h1>Reportes y Estadísticas</h1>
        <p>Análisis detallado del rendimiento del negocio</p>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Rango de Fechas:</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mes</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Año</option>
          </select>
        </div>
        <div className="filter-actions">
          <button className="btn btn-primary">
            <i className="fas fa-download"></i>
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Gráficos de Reportes */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Ingresos por Tipo de Servicio</h3>
          </div>
          <BarChart 
            data={revenueByServiceData} 
            title="Distribución de Ingresos" 
          />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Crecimiento de Clientes</h3>
          </div>
          <LineChart 
            data={clientGrowthData} 
            title="Nuevos Clientes Mensuales" 
          />
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Métodos de Pago Preferidos</h3>
          </div>
          <DoughnutChart 
            data={paymentMethodsData} 
            title="Preferencias de Pago" 
          />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Métricas de Rendimiento</h3>
          </div>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">94.2%</div>
              <div className="metric-label">Tasa de Satisfacción</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">87%</div>
              <div className="metric-label">Retención de Clientes</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">12.5%</div>
              <div className="metric-label">Crecimiento Mensual</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">2.3</div>
              <div className="metric-label">Servicios/Cliente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;