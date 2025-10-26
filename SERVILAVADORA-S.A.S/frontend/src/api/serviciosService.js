// src/api/serviciosService.js
import api from './axios';

export const serviciosService = {
  getAll: async () => {
    const response = await api.get('/servicios/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/servicios/${id}`);
    return response.data;
  },

  create: async (servicio) => {
    const response = await api.post('/servicios/', servicio);
    return response.data;
  },

  update: async (id, servicio) => {
    const response = await api.put(`/servicios/${id}`, servicio);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/servicios/${id}`);
    return response.data;
  }
};