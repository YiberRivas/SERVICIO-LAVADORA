import express from 'express';
import { obtenerLavadoras, crearLavadora } from '../controllers/lavadoraController.js';

const router = express.Router();

router.get('/', obtenerLavadoras);
router.post('/', crearLavadora);

export default router;
