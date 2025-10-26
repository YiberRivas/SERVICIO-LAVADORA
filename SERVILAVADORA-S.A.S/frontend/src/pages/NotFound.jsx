import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404</h1>
      <p>aqui no hay nada</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
