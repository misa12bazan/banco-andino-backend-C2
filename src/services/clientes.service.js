// Capa service: clientes (usuarios con rol "cliente")
import bcrypt from 'bcryptjs';
import { HttpError } from '../utils/errores.js';
import { validarCliente } from '../utils/validaciones.js';
import * as usuarios from '../repositories/usuarios.repository.js';

export const listar = () => usuarios.listarClientes();

export async function crear(datos) {
  const errores = validarCliente(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);

  const correo = String(datos.correo).trim();
  if (await usuarios.buscarPorCorreo(correo)) throw new HttpError(409, 'Ese correo ya tiene una cuenta');

  const contrasenaHash = await bcrypt.hash(String(datos.contrasena), 10);
  return usuarios.crear({ nombre: String(datos.nombre).trim(), correo, contrasenaHash, rol: 'cliente' });
}
