import * as service from '../services/pagos.service.js';

export async function crear(req, res, next) {
  try { res.status(201).json(await service.pagarYRegistrar(req.body, req.usuario)); } catch (e) { next(e); }
}
export async function listarMios(req, res, next) {
  try { res.status(200).json(await service.listarMios(req.usuario.id)); } catch (e) { next(e); }
}
