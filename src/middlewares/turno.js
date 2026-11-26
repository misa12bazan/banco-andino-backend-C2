// Regla del parcial: un empleado solo puede crear, editar o eliminar dentro de su turno.
// Administrador no tiene restricción. Fuera de turno => 403.
import { HttpError } from '../utils/errores.js';
import { estaEnTurno, horarioTurno } from '../utils/turnos.js';

export function exigirTurno(req, res, next) {
  const u = req.usuario;
  if (u.rol === 'empleado' && !estaEnTurno(u.turno)) {
    return next(new HttpError(403, `Fuera de turno. Tu turno (${u.turno || 'no asignado'}) es de ${horarioTurno(u.turno)}. Solo puedes consultar.`));
  }
  next();
}
