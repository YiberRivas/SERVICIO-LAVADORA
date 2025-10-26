// src/pages/Dashboard/components/MisAgendamientos.jsx
import React, { useState, useEffect } from 'react';
import { agendamientosService } from '../../../api/agendamientosService';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';

const MisAgendamientos = ({ onUpdate }) => {
  const [agendamientos, setAgendamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarAgendamientos();
  }, []);

  const cargarAgendamientos = async () => {
    try {
      const data = await agendamientosService.getMisAgendamientos();
      setAgendamientos(data);
    } catch (err) {
      setError('Error al cargar agendamientos');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id) => {
    if (!window.confirm('¿Estás seguro de cancelar este agendamiento?')) return;

    try {
      await agendamientosService.cancelar(id);
      await cargarAgendamientos();
      if (onUpdate) onUpdate();
      alert('Agendamiento cancelado exitosamente');
    } catch (err) {
      alert('Error al cancelar agendamiento');
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'confirmado': 'bg-blue-100 text-blue-800',
      'en_proceso': 'bg-purple-100 text-purple-800',
      'finalizado': 'bg-green-100 text-green-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mis Agendamientos</h2>

      {error && <Alert type="error" message={error} />}

      {agendamientos.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No tienes agendamientos aún</p>
            <p className="text-gray-500 mt-2">¡Agenda tu primer servicio ahora!</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {agendamientos.map(agendamiento => (
            <Card key={agendamiento.id_agendamiento}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">
                      {agendamiento.servicio?.nombre_servicio || 'Servicio'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoBadge(agendamiento.estado)}`}>
                      {agendamiento.estado}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <p><strong>📅 Fecha:</strong> {new Date(agendamiento.fecha).toLocaleDateString('es-CO')}</p>
                      <p><strong>⏰ Hora:</strong> {agendamiento.hora}</p>
                    </div>
                    <div>
                      <p><strong>💰 Precio:</strong> ${agendamiento.servicio?.precio_base?.toLocaleString()}</p>
                      <p><strong>🆔 ID:</strong> #{agendamiento.id_agendamiento}</p>
                    </div>
                  </div>

                  {agendamiento.observaciones && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">
                        <strong>Observaciones:</strong> {agendamiento.observaciones}
                      </p>
                    </div>
                  )}
                </div>

                {agendamiento.estado === 'pendiente' && (
                  <Button
                    variant="danger"
                    onClick={() => handleCancelar(agendamiento.id_agendamiento)}
                    className="ml-4"
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisAgendamientos;
