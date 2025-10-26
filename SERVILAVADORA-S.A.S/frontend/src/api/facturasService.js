// src/api/facturasService.js
import api from './axios';

export const facturasService = {
  getAll: async (params = {}) => {
    const response = await api.get('/facturas/', { params });
    return response.data;
  },

  getMisFacturas: async () => {
    const response = await api.get('/facturas/mis-facturas/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/facturas/${id}`);
    return response.data;
  },

  create: async (factura) => {
    const response = await api.post('/facturas/', factura);
    return response.data;
  },

  marcarPagada: async (id) => {
    const response = await api.put(`/facturas/${id}/pagar`);
    return response.data;
  },

  anular: async (id) => {
    const response = await api.delete(`/facturas/${id}/anular`);
    return response.data;
  }
};
