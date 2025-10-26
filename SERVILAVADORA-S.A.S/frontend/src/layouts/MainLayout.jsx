import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Aquí se renderiza la página según la ruta */}
      </main>
      <footer>
        © {new Date().getFullYear()} Servilavadora — Todos los derechos reservados
      </footer>
    </div>
  );
}
