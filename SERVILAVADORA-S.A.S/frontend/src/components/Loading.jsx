// src/components/Loading.jsx
import React from 'react';

const Loading = ({ text = 'Cargando...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default Loading;