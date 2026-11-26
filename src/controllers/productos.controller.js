import * as service from '../services/productos.service.js';

export async function listar(req, res, next) {
  try { res.status(200).json(await service.listar(req.query.categoria)); } catch (e) { next(e); }
}
export async function obtener(req, res, next) {
  try { res.status(200).json(await service.obtener(req.params.id)); } catch (e) { next(e); }
}
export async function crear(req, res, next) {
  try { res.status(201).json(await service.crear(req.body)); } catch (e) { next(e); }
}
export async function actualizar(req, res, next) {
  try { res.status(200).json(await service.actualizar(req.params.id, req.body)); } catch (e) { next(e); }
}
export async function eliminar(req, res, next) {
  try { await service.eliminar(req.params.id); res.status(200).json({ mensaje: 'Producto eliminado' }); } catch (e) { next(e); }
}
