import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

const LoginWrapper = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    if (result.success) navigate('/');
    return result;
  };

  return (
    <Login
      onLogin={handleLogin}
      onNavigateToRegister={() => navigate('/registro')}
      onNavigateToHome={() => navigate('/')}
    />
  );
};

export default App;








