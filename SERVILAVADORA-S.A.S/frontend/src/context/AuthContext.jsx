import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificar si hay usuario en localStorage
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('lavarenta_user');
        const storedToken = localStorage.getItem('lavarenta_token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('lavarenta_user');
        localStorage.removeItem('lavarenta_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login - simula login exitoso
  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Crear usuario mock
      const mockUser = {
        id: 1,
        name: 'Usuario Demo',
        email: email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Guardar en estado y localStorage
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('lavarenta_user', JSON.stringify(mockUser));
      localStorage.setItem('lavarenta_token', mockToken);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error en el login' };
    } finally {
      setLoading(false);
    }
  };

  // Mock register - simula registro exitoso
  const register = async (userData) => {
    setLoading(true);
    
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Crear usuario mock
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Guardar en estado y localStorage
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('lavarenta_user', JSON.stringify(mockUser));
      localStorage.setItem('lavarenta_token', mockToken);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error en el registro' };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('lavarenta_user');
    localStorage.removeItem('lavarenta_token');
  };

  // Demo login rápido
  const demoLogin = () => {
    return login('demo@lavarenta.com', 'demo123');
  };

  // Valores que estarán disponibles en el contexto
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    demoLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};