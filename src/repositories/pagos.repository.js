// Capa repository: SQL de la tabla pagos. Solo se guardan los últimos 4 dígitos de la tarjeta.
import { query } from '../config/db.js';

export async function crear({ idUsuario, idSolicitud, idProducto, monto, titular, ultimos4, marca }) {
  const r = await query(
    `INSERT INTO pagos (id_usuario, id_solicitud, id_producto, monto, titular, tarjeta_ultimos4, marca, estado)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'aprobado') RETURNING *`,
    [idUsuario, idSolicitud, idProducto, monto, titular, ultimos4, marca]);
  return r.rows[0];
}

export async function listarPorUsuario(idUsuario) {
  return (await query(
    `SELECT p.*, pr.nombre AS producto, s.codigo_seguimiento
     FROM pagos p
     LEFT JOIN productos pr ON pr.id = p.id_producto
     LEFT JOIN solicitudes_apertura_cuenta s ON s.id = p.id_solicitud
     WHERE p.id_usuario = $1 ORDER BY p.fecha_pago DESC`, [idUsuario])).rows;
}

