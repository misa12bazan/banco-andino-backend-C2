import * as service from '../services/solicitudes.service.js';

// ----- Administrador / empleado -----
export async function listar(req, res, next) {
  try { res.status(200).json(await service.listarTodas()); } catch (e) { next(e); }
}
export async function obtener(req, res, next) {
  try { res.status(200).json(await service.obtener(req.params.id)); } catch (e) { next(e); }
}
export async function crear(req, res, next) {
  try { res.status(201).json(await service.crearComoPanel(req.body)); } catch (e) { next(e); }
}
export async function actualizar(req, res, next) {
  try { res.status(200).json(await service.actualizarComoPanel(req.params.id, req.body)); } catch (e) { next(e); }
}
export async function eliminar(req, res, next) {
  try { await service.eliminar(req.params.id); res.status(200).json({ mensaje: 'Solicitud eliminada' }); } catch (e) { next(e); }
}

// ----- Cliente -----
export async function listarMias(req, res, next) {
  try { res.status(200).json(await service.listarDeCliente(req.usuario.id)); } catch (e) { next(e); }
}
export async function obtenerMia(req, res, next) {
  try { res.status(200).json(await service.obtenerDeCliente(req.params.id, req.usuario.id)); } catch (e) { next(e); }
}
export async function crearMia(req, res, next) {
  try { res.status(201).json(await service.crearDeCliente(req.body, req.usuario.id)); } catch (e) { next(e); }
}
export async function actualizarMia(req, res, next) {
  try { res.status(200).json(await service.actualizarDeCliente(req.params.id, req.body, req.usuario.id)); } catch (e) { next(e); }
}
