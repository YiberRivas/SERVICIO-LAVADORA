// src/pages/Dashboard/components/MisFacturas.jsx
import React, { useState, useEffect } from 'react';
import { facturasService } from '../../../api/facturasService';
import Card from '../../../components/Card';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';

const MisFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
    try {
      const data = await facturasService.getMisFacturas();
      setFacturas(data);
    } catch (err) {
      setError('Error al cargar facturas');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'emitida': 'bg-yellow-100 text-yellow-800',
      'pagada': 'bg-green-100 text-green-800',
      'anulada': 'bg-red-100 text-red-800'
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mis Facturas</h2>

      {error && <Alert type="error" message={error} />}

      {facturas.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No tienes facturas aún</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {facturas.map(factura => (
            <Card key={factura.id_factura}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">Factura #{factura.id_factura}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoBadge(factura.estado)}`}>
                      {factura.estado}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    📅 {new Date(factura.fecha).toLocaleDateString('es-CO')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">
                    ${factura.total?.toLocaleString()}
                  </p>
                  {factura.forma_pago && (
                    <p className="text-sm text-gray-600 mt-1">
                      💳 {factura.forma_pago.nombre_forma}
                    </p>
                  )}
                </div>
              </div>

              {/* Detalles */}
              {factura.detalles && factura.detalles.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Detalles:</h4>
                  <div className="space-y-2">
                    {factura.detalles.map(detalle => (
                      <div key={detalle.id_detalle} className="flex justify-between text-sm">
                        <span>
                          {detalle.servicio?.nombre_servicio || 'Servicio'} x {detalle.cantidad}
                        </span>
                        <span className="font-semibold">
                          ${(detalle.cantidad * detalle.precio_unitario).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisFacturas;