import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Servicios from "./pages/Servicios/Servicios";
import Login from "./pages/Login/Login";
import Soporte from "./pages/Soporte/Soporte";
import Registro from "./pages/Registro/Registro";
import Dashboard from "./pages/Dashboard/Dashboard"; // 👈 Asegúrate que exista este archivo
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="login" element={<Login />} />
          <Route path="soporte" element={<Soporte />} />
          <Route path="registro" element={<Registro />} />
        </Route>

        {/* ✅ Ruta temporal para trabajar el panel administrativo */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
