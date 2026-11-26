import { Router } from 'express';
import auth from './auth.routes.js';
import productos from './productos.routes.js';
import clientes from './clientes.routes.js';
import solicitudes from './solicitudes.routes.js';
import misSolicitudes from './misSolicitudes.routes.js';

const r = Router();
r.use('/auth', auth);
r.use('/productos', productos);
r.use('/clientes', clientes);
r.use('/solicitudes', solicitudes);
r.use('/mis-solicitudes', misSolicitudes);
export default r;
