/*para subir los archivos a github "git push origin main"*/
/*comando para actualizar los cambios del otro "git pull origin main" */

/*CUANDO SE VALLA A SUBIR LOS CAMBIOS USAMOS 

git add .
git commit -m "Descripción de los cambios"
  
PARA QUE LA OTRA PERSONA SEPA QUE CAMBIOS FUERON*/

/* 
    npm run server   # para el backend
    npm run dev      # para el frontend 
*/



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
