// Pagos: solo el cliente con sesión iniciada
import { Router } from 'express';
import * as c from '../controllers/pagos.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { permitirRoles } from '../middlewares/roles.js';

const r = Router();
r.use(verificarToken, permitirRoles('cliente'));
r.post('/', c.crear);
r.get('/mios', c.listarMios);
export default r;
