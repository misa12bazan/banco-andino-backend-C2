// Lee las variables de entorno (.env en local, panel de Render en producción)
import 'dotenv/config';

const horaSimulada = process.env.HORA_SIMULADA;

export const env = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim()),
  horaSimulada: horaSimulada === undefined || horaSimulada === '' ? null : Number(horaSimulada)
};

if (!env.databaseUrl) console.error('Falta DATABASE_URL en las variables de entorno');
if (!env.jwtSecret) console.error('Falta JWT_SECRET en las variables de entorno');
