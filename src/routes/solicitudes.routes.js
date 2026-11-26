import { Router } from 'express';
import * as c from '../controllers/solicitudes.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { permitirRoles } from '../middlewares/roles.js';
import { exigirTurno } from '../middlewares/turno.js';

const r = Router();
r.use(verificarToken, permitirRoles('administrador', 'empleado'));
r.get('/', c.listar);
r.get('/:id', c.obtener);
r.post('/', exigirTurno, c.crear);
r.put('/:id', exigirTurno, c.actualizar);
r.delete('/:id', exigirTurno, c.eliminar);
export default r;
