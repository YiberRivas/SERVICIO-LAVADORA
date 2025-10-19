import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import lavadoraRoutes from './routes/lavadoraRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/lavadoras', lavadoraRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`✅ Servidor backend en http://localhost:${PORT}`));
