// Manejo central de errores: todas las respuestas de error tienen el mismo formato JSON
import { HttpError } from '../utils/errores.js';

export function noEncontrada(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function manejarErrores(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, ...(err.detalles ? { detalles: err.detalles } : {}) });
  }
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'El cuerpo no es un JSON válido' });
  if (err.code === '23505') return res.status(409).json({ error: 'Ya existe un registro con esos datos' });
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
