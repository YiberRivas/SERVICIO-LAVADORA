// src/pages/Dashboard/components/MiHistorial.jsx
import React, { useState, useEffect } from 'react';
import { historialService } from '../../../api/historialService';
import Card from '../../../components/Card';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';

const MiHistorial = () => {
  const [historial, setHistorial] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const data = await historialService.getMiHistorial();
      setHistorial(data);
    } catch (err) {
      setError('Error al cargar historial');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mi Historial de Servicios</h2>

      {error && <Alert type="error" message={error} />}

      {historial.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No tienes historial de servicios aún</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {historial.map(item => (
            <Card key={item.id_historial}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">✅</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">
                    {item.servicio?.nombre_servicio || 'Servicio'}
                  </h3>
                  <p className="text-gray-600">
                    📅 {new Date(item.fecha).toLocaleDateString('es-CO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {item.observaciones && (
                    <p className="text-sm text-gray-500 mt-2">
                      {item.observaciones}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiHistorial;