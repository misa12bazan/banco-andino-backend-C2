// Capa repository: SQL de la tabla productos (planes de tarjetas de crédito y cuentas)
import { query } from '../config/db.js';

export async function listar(categoria) {
  if (categoria) {
    return (await query('SELECT * FROM productos WHERE categoria = $1 AND activo = true ORDER BY id', [categoria])).rows;
  }
  return (await query('SELECT * FROM productos WHERE activo = true ORDER BY id')).rows;
}

export async function buscarPorId(id) {
  return (await query('SELECT * FROM productos WHERE id = $1', [id])).rows[0] || null;
}

export async function crear(d) {
  const r = await query(
    `INSERT INTO productos (nombre, categoria, descripcion, costo_mensual, beneficios)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [d.nombre.trim(), d.categoria, d.descripcion.trim(), Number(d.costo_mensual), d.beneficios ?? null]);
  return r.rows[0];
}

export async function actualizar(id, d) {
  const r = await query(
    `UPDATE productos SET nombre = $1, categoria = $2, descripcion = $3, costo_mensual = $4, beneficios = $5
     WHERE id = $6 RETURNING *`,
    [d.nombre.trim(), d.categoria, d.descripcion.trim(), Number(d.costo_mensual), d.beneficios ?? null, id]);
  return r.rows[0] || null;
}

export async function eliminar(id) {
  const r = await query('DELETE FROM productos WHERE id = $1', [id]);
  return r.rowCount > 0;
}
