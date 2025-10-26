// src/api/agendamientosService.js
import api from './axios';

export const agendamientosService = {
  getAll: async (params = {}) => {
    const response = await api.get('/agendamientos/', { params });
    return response.data;
  },

  getMisAgendamientos: async () => {
    const response = await api.get('/agendamientos/mis-agendamientos/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/agendamientos/${id}`);
    return response.data;
  },

  create: async (agendamiento) => {
    const response = await api.post('/agendamientos/', agendamiento);
    return response.data;
  },

  update: async (id, agendamiento) => {
    const response = await api.put(`/agendamientos/${id}`, agendamiento);
    return response.data;
  },

  cancelar: async (id) => {
    const response = await api.delete(`/agendamientos/${id}`);
    return response.data;
  },

  getHorariosDisponibles: async (fecha, servicioId) => {
    const response = await api.get('/agendamientos/disponibilidad/horarios', {
      params: { fecha, servicio_id: servicioId }
    });
    return response.data;
  }
};