// Rutas del cliente: solo ve y edita sus propias solicitudes
import { Router } from 'express';
import * as c from '../controllers/solicitudes.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { permitirRoles } from '../middlewares/roles.js';

const r = Router();
r.use(verificarToken, permitirRoles('cliente'));
r.get('/', c.listarMias);
r.get('/:id', c.obtenerMia);
r.post('/', c.crearMia);
r.put('/:id', c.actualizarMia);
export default r;
