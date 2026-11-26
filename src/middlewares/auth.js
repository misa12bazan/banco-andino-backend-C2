// Pide el token JWT: Authorization: Bearer <token>. Sin token o token malo => 401
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from '../utils/errores.js';

export function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization || '';
  const [tipo, token] = cabecera.split(' ');
  if (tipo !== 'Bearer' || !token) return next(new HttpError(401, 'Falta el token. Inicia sesión.'));
  try {
    req.usuario = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new HttpError(401, 'Token inválido o vencido. Inicia sesión de nuevo.'));
  }
}
