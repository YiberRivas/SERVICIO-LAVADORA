// src/api/reportesService.js
import api from './axios';

export const reportesService = {
  getDashboard: async () => {
    const response = await api.get('/reportes/dashboard');
    return response.data;
  },

  getReporteAgendamientos: async (params = {}) => {
    const response = await api.get('/reportes/agendamientos', { params });
    return response.data;
  },

  getReporteIngresos: async (params = {}) => {
    const response = await api.get('/reportes/ingresos', { params });
    return response.data;
  },

  getReporteMensual: async (año, mes) => {
    const response = await api.get(`/reportes/mensual/${año}/${mes}`);
    return response.data;
  }
};