import { Router } from 'express';
import * as c from '../controllers/clientes.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { permitirRoles } from '../middlewares/roles.js';
import { exigirTurno } from '../middlewares/turno.js';

const r = Router();
r.use(verificarToken, permitirRoles('administrador', 'empleado'));
r.get('/', c.listar);
r.post('/', exigirTurno, c.crear);
export default r;
