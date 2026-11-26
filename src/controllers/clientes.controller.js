import * as service from '../services/clientes.service.js';

export async function listar(req, res, next) {
  try { res.status(200).json(await service.listar()); } catch (e) { next(e); }
}
export async function crear(req, res, next) {
  try { res.status(201).json(await service.crear(req.body)); } catch (e) { next(e); }
}
