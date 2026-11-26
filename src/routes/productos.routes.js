import { Router } from 'express';
import * as c from '../controllers/productos.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { permitirRoles } from '../middlewares/roles.js';
import { exigirTurno } from '../middlewares/turno.js';

const r = Router();
const gestion = [verificarToken, permitirRoles('administrador', 'empleado'), exigirTurno];

r.get('/', c.listar);          // público
r.get('/:id', c.obtener);      // público
r.post('/', ...gestion, c.crear);
r.put('/:id', ...gestion, c.actualizar);
r.delete('/:id', ...gestion, c.eliminar);
export default r;
