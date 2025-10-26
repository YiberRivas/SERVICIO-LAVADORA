import React from "react";

const Perfil = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Mi Perfil
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Nombre</label>
            <input
              type="text"
              value="Juan Pérez"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Correo</label>
            <input
              type="email"
              value="juan.perez@correo.com"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Teléfono</label>
            <input
              type="text"
              value="+57 312 000 0000"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              readOnly
            />
          </div>

          <button
            type="button"
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
