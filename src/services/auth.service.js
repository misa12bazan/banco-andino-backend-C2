// Capa service: reglas de negocio del login y del registro
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from '../utils/errores.js';
import { validarLogin } from '../utils/validaciones.js';
import * as usuarios from '../repositories/usuarios.repository.js';

export async function login(datos) {
  const errores = validarLogin(datos);
  if (errores.length) throw new HttpError(400, 'Datos incompletos', errores);

  const u = await usuarios.buscarPorCorreo(String(datos.correo).trim());
  // El mismo mensaje para correo o clave incorrectos: no se da pistas a un atacante
  if (!u || !(await bcrypt.compare(String(datos.contrasena), u.contrasena))) {
    throw new HttpError(401, 'Correo o contraseña incorrectos');
  }
  const usuario = { id: u.id, nombre: u.nombre, correo: u.correo, rol: u.rol, turno: u.turno };
  const token = jwt.sign(usuario, env.jwtSecret, { expiresIn: '8h' });
  return { token, usuario };
}
