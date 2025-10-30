import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Servicios from "./pages/Servicios/Servicios";
import Login from "./pages/Login/Login";
import Soporte from "./pages/Soporte/Soporte";
import Registro from "./pages/Registro/Registro";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./styles/globals.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="login" element={<Login />} />
            <Route path="soporte" element={<Soporte />} />
            <Route path="registro" element={<Registro />} />
          </Route>

          {/* Panel administrativo */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 
