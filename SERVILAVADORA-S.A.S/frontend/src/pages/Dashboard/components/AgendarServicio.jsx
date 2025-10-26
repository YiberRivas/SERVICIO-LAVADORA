// src/pages/Dashboard/components/AgendarServicio.jsx
import React, { useState, useEffect } from 'react';
import { serviciosService } from '../../../api/serviciosService';
import { agendamientosService } from '../../../api/agendamientosService';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';

const AgendarServicio = () => {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [fecha, setFecha] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    cargarServicios();
  }, []);

  useEffect(() => {
    if (servicioSeleccionado && fecha) {
      cargarHorariosDisponibles();
    }
  }, [servicioSeleccionado, fecha]);

  const cargarServicios = async () => {
    try {
      const data = await serviciosService.getAll();
      setServicios(data.filter(s => s.activo));
    } catch (err) {
      setError('Error al cargar servicios');
    }
  };

  const cargarHorariosDisponibles = async () => {
    try {
      const data = await agendamientosService.getHorariosDisponibles(fecha, servicioSeleccionado);
      setHorariosDisponibles(data.horarios_disponibles || []);
    } catch (err) {
      console.error(err);
      setHorariosDisponibles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await agendamientosService.create({
        persona_id: user.persona_id,
        servicio_id: servicioSeleccionado,
        fecha,
        hora: horarioSeleccionado + ':00',
        observaciones
      });

      setSuccess('¡Agendamiento creado exitosamente!');
      // Resetear formulario
      setServicioSeleccionado(null);
      setFecha('');
      setHorarioSeleccionado('');
      setObservaciones('');
      setHorariosDisponibles([]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al crear agendamiento');
    } finally {
      setLoading(false);
    }
  };

  const servicioInfo = servicios.find(s => s.id_servicio === servicioSeleccionado);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Agendar Nuevo Servicio</h2>

      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <Card>
        <form onSubmit={handleSubmit}>
          {/* Seleccionar Servicio */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">
              1. Selecciona el Servicio <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicios.map(servicio => (
                <div
                  key={servicio.id_servicio}
                  onClick={() => setServicioSeleccionado(servicio.id_servicio)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    servicioSeleccionado === servicio.id_servicio
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">🧺</div>
                    <h4 className="font-bold">{servicio.nombre_servicio}</h4>
                    <p className="text-sm text-gray-600 mt-1">{servicio.descripcion}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      ${servicio.precio_base.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seleccionar Fecha */}
          {servicioSeleccionado && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                2. Selecciona la Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Seleccionar Horario */}
          {fecha && horariosDisponibles.length > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                3. Selecciona el Horario <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                {horariosDisponibles.map(horario => (
                  <button
                    key={horario}
                    type="button"
                    onClick={() => setHorarioSeleccionado(horario)}
                    className={`p-3 rounded-lg font-semibold transition ${
                      horarioSeleccionado === horario
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>
          )}

          {fecha && horariosDisponibles.length === 0 && (
            <Alert type="warning" message="No hay horarios disponibles para esta fecha. Por favor selecciona otra fecha." />
          )}

          {/* Observaciones */}
          {horarioSeleccionado && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                4. Observaciones (Opcional)
              </label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Alguna indicación especial..."
              />
            </div>
          )}

          {/* Resumen y Confirmar */}
          {horarioSeleccionado && servicioInfo && (
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-lg mb-3">Resumen del Agendamiento</h4>
              <div className="space-y-2">
                <p><strong>Servicio:</strong> {servicioInfo.nombre_servicio}</p>
                <p><strong>Precio:</strong> ${servicioInfo.precio_base.toLocaleString()}</p>
                <p><strong>Fecha:</strong> {new Date(fecha).toLocaleDateString('es-CO')}</p>
                <p><strong>Hora:</strong> {horarioSeleccionado}</p>
                {observaciones && <p><strong>Observaciones:</strong> {observaciones}</p>}
              </div>
            </div>
          )}

          {horarioSeleccionado && (
            <Button type="submit" disabled={loading} fullWidth>
              {loading ? 'Agendando...' : 'Confirmar Agendamiento'}
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AgendarServicio;