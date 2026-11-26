// Deja pasar solo a los roles indicados. Otro rol => 403 (autenticado pero sin permiso)
import { HttpError } from '../utils/errores.js';

export const permitirRoles = (...roles) => (req, res, next) => {
  if (!req.usuario || !roles.includes(req.usuario.rol)) {
    return next(new HttpError(403, 'No tienes permiso para esta acción'));
  }
  next();
};
