import React, { useState } from "react";

const Agenda = () => {
  const [form, setForm] = useState({
    servicio: "",
    fecha: "",
    hora: "",
    direccion: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Agendamiento realizado exitosamente");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Agendar Servicio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="servicio"
          placeholder="Servicio"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="date"
          name="fecha"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="time"
          name="hora"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
          Agendar
        </button>
      </form>
    </div>
  );
};

export default Agenda;
