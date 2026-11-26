import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import rutas from './routes/index.js';
import { noEncontrada, manejarErrores } from './middlewares/errores.js';

const app = express();

app.use(cors({
  origin(origen, cb) {
    // Postman y Render (sin "origin") pasan; el navegador solo desde los dominios permitidos
    if (!origen || env.corsOrigins.includes(origen)) return cb(null, true);
    cb(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json());

app.get('/', (req, res) => res.json({ servicio: 'API Banco Andino Perú', estado: 'ok' }));
app.use('/api', rutas);

app.use(noEncontrada);
app.use(manejarErrores);

export default app;
