import React from "react";

const Tutoriales = () => {
  const tutoriales = [
    {
      id: 1,
      titulo: "Cómo agendar un servicio",
      descripcion: "Aprende a reservar un servicio paso a paso.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      titulo: "Cómo realizar un pago",
      descripcion: "Guía rápida para pagar tus facturas desde la app.",
      video: "https://www.youtube.com/embed/ysz5S6PUM-U",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Tutoriales y Ayuda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutoriales.map((t) => (
          <div key={t.id} className="border rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{t.titulo}</h2>
            <p className="text-gray-600 mb-4">{t.descripcion}</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full rounded-xl"
                src={t.video}
                title={t.titulo}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutoriales;
