// Turnos de los trabajadores (hora de Lima). Es la misma regla del parcial, ahora validada en el servidor.
import { env } from '../config/env.js';

export const TURNOS = {
  'mañana': { inicio: 6, fin: 14 },
  tarde: { inicio: 14, fin: 22 },
  noche: { inicio: 22, fin: 6 }
};

export function horaActual() {
  if (env.horaSimulada !== null) return env.horaSimulada;
  return Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Lima', hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
}

export function estaEnTurno(turno) {
  if (!turno || !TURNOS[turno]) return false;
  const hora = horaActual();
  const { inicio, fin } = TURNOS[turno];
  if (inicio < fin) return hora >= inicio && hora < fin;
  return hora >= inicio || hora < fin; // el turno noche cruza la medianoche
}

export function horarioTurno(turno) {
  if (!turno || !TURNOS[turno]) return 'sin turno asignado';
  const f = h => String(h).padStart(2, '0') + ':00';
  return `${f(TURNOS[turno].inicio)} a ${f(TURNOS[turno].fin)}`;
}
