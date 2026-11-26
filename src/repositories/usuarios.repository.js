// Capa repository: aquí vive SOLO el SQL de la tabla usuarios. Los datos del usuario van como $1, $2... (SQL seguro).
import { query } from '../config/db.js';

export async function buscarPorCorreo(correo) {
  const r = await query(
    'SELECT id, nombre, correo, contrasena, rol, turno FROM usuarios WHERE lower(correo) = lower($1)', [correo]);
  return r.rows[0] || null;
}

export async function crear({ nombre, correo, contrasenaHash, rol = 'cliente' }) {
  const r = await query(
    `INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, correo, rol, fecha_creacion`,
    [nombre, correo, contrasenaHash, rol]);
  return r.rows[0];
}

export async function listarClientes() {
  const r = await query(
    "SELECT id, nombre, correo, rol, fecha_creacion FROM usuarios WHERE rol = 'cliente' ORDER BY id");
  return r.rows;
}
