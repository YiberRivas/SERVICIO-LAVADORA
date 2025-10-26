import React from "react";

const PagosCliente = () => {
  const pagos = [
    { id: 1, factura: "F001", estado: "Pendiente", monto: 120 },
    { id: 2, factura: "F002", estado: "Pagado", monto: 90 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mis Pagos y Facturas</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Factura</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((p) => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.factura}</td>
              <td>{p.estado}</td>
              <td>${p.monto}</td>
              <td>
                {p.estado === "Pendiente" && (
                  <button className="bg-blue-500 text-white py-1 px-3 rounded">
                    Pagar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagosCliente;
