/*para subir los archivos a github "git push origin main"*/
/*comando para actualizar los cambios del otro "git pull origin main" */

/*CUANDO SE VALLA A SUBIR LOS CAMBIOS USAMOS 

git add .
git commit -m "Descripción de los cambios"
  
PARA QUE LA OTRA PERSONA SEPA QUE CAMBIOS FUERON*/
 
/* 
hacer tex para la conecion a la base de datos 
  "python -m app.config.test_connection" 


  puerto para la conexion 

    uvicorn app.main:app --reload --log-level debug

  
    npm run server   # para el backend
    npm run dev      # para el frontend 
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);