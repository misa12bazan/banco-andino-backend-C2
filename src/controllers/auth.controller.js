// Capa controller: recibe la petición HTTP, llama al service y responde
import * as authService from '../services/auth.service.js';
import * as clientesService from '../services/clientes.service.js';

export async function login(req, res, next) {
  try { res.status(200).json(await authService.login(req.body)); } catch (e) { next(e); }
}

export async function registro(req, res, next) {
  try { res.status(201).json(await clientesService.crear(req.body)); } catch (e) { next(e); }
}

export function perfil(req, res) {
  res.status(200).json(req.usuario);
}
