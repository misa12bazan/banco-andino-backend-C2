import { Router } from 'express';
import * as c from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.js';

const r = Router();
r.post('/login', c.login);
r.post('/registro', c.registro);
r.get('/perfil', verificarToken, c.perfil);
export default r;
