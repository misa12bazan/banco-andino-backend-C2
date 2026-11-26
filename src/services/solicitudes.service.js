// Capa service: solicitudes de apertura de cuenta
import { HttpError } from '../utils/errores.js';
import { validarSolicitud, idValido } from '../utils/validaciones.js';
import * as repo from '../repositories/solicitudes.repository.js';

const generarCodigo = () =>
  'COD-' + Date.now().toString().slice(-6) + String(Math.floor(Math.random() * 100)).padStart(2, '0');

function leerId(idTexto) {
  const id = idValido(idTexto);
  if (!id) throw new HttpError(400, 'El id debe ser un número entero positivo');
  return id;
}

function exigirValidos(datos) {
  const errores = validarSolicitud(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
}

// ----- Administrador / empleado -----
export const listarTodas = () => repo.listarTodas();

export async function obtener(idTexto) {
  const s = await repo.buscarPorId(leerId(idTexto));
  if (!s) throw new HttpError(404, 'Solicitud no encontrada');
  return s;
}

export async function crearComoPanel(datos) {
  exigirValidos(datos);
  return repo.crear(datos, null, generarCodigo());
}

export async function actualizarComoPanel(idTexto, datos) {
  const id = leerId(idTexto);
  exigirValidos(datos);
  const s = await repo.actualizar(id, datos);
  if (!s) throw new HttpError(404, 'Solicitud no encontrada');
  return s;
}

export async function eliminar(idTexto) {
  if (!(await repo.eliminar(leerId(idTexto)))) throw new HttpError(404, 'Solicitud no encontrada');
}

// ----- Cliente (solo ve y edita lo suyo) -----
export const listarDeCliente = idUsuario => repo.listarPorUsuario(idUsuario);

export async function obtenerDeCliente(idTexto, idUsuario) {
  const s = await repo.buscarPorId(leerId(idTexto));
  // Si es de otro cliente se responde 404, igual que si no existiera
  if (!s || s.id_usuario !== idUsuario) throw new HttpError(404, 'Solicitud no encontrada');
  return s;
}

export async function crearDeCliente(datos, idUsuario) {
  exigirValidos(datos);
  return repo.crear({ ...datos, estado: 'registrado' }, idUsuario, generarCodigo());
}

export async function actualizarDeCliente(idTexto, datos, idUsuario) {
  const id = leerId(idTexto);
  exigirValidos(datos);
  const s = await repo.actualizarDeCliente(id, idUsuario, datos);
  if (!s) throw new HttpError(404, 'Solicitud no encontrada o ya no se puede editar');
  return s;
}
