// Capa repository: SQL de solicitudes_apertura_cuenta
import { query } from '../config/db.js';

export async function listarTodas() {
  return (await query(
    `SELECT s.*, u.nombre AS cliente FROM solicitudes_apertura_cuenta s
     LEFT JOIN usuarios u ON u.id = s.id_usuario ORDER BY s.fecha_registro DESC`)).rows;
}

export async function listarPorUsuario(idUsuario) {
  return (await query(
    'SELECT * FROM solicitudes_apertura_cuenta WHERE id_usuario = $1 ORDER BY fecha_registro DESC', [idUsuario])).rows;
}

export async function buscarPorId(id) {
  return (await query(
    `SELECT s.*, u.nombre AS cliente FROM solicitudes_apertura_cuenta s
     LEFT JOIN usuarios u ON u.id = s.id_usuario WHERE s.id = $1`, [id])).rows[0] || null;
}

export async function crear(d, idUsuario, codigo) {
  const r = await query(
    `INSERT INTO solicitudes_apertura_cuenta
       (id_usuario, codigo_seguimiento, nombres, apellidos, dni, telefono, tipo_cuenta, moneda, monto_inicial, estado)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [idUsuario, codigo, d.nombres.trim(), d.apellidos.trim(), d.dni, d.telefono,
     d.tipo_cuenta, d.moneda, Number(d.monto_inicial), d.estado || 'registrado']);
  return r.rows[0];
}

// Panel (administrador/empleado): puede cambiar también el estado
export async function actualizar(id, d) {
  const r = await query(
    `UPDATE solicitudes_apertura_cuenta
     SET nombres = $1, apellidos = $2, dni = $3, telefono = $4, tipo_cuenta = $5,
         moneda = $6, monto_inicial = $7, estado = $8
     WHERE id = $9 RETURNING *`,
    [d.nombres.trim(), d.apellidos.trim(), d.dni, d.telefono, d.tipo_cuenta,
     d.moneda, Number(d.monto_inicial), d.estado || 'registrado', id]);
  return r.rows[0] || null;
}

// Cliente: solo su propia solicitud y solo si sigue "registrado"
export async function actualizarDeCliente(id, idUsuario, d) {
  const r = await query(
    `UPDATE solicitudes_apertura_cuenta
     SET nombres = $1, apellidos = $2, dni = $3, telefono = $4, tipo_cuenta = $5, moneda = $6, monto_inicial = $7
     WHERE id = $8 AND id_usuario = $9 AND estado = 'registrado' RETURNING *`,
    [d.nombres.trim(), d.apellidos.trim(), d.dni, d.telefono, d.tipo_cuenta,
     d.moneda, Number(d.monto_inicial), id, idUsuario]);
  return r.rows[0] || null;
}

export async function eliminar(id) {
  const r = await query('DELETE FROM solicitudes_apertura_cuenta WHERE id = $1', [id]);
  return r.rowCount > 0;
}
