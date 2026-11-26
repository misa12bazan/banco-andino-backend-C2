// Capa service: productos (cuentas y planes de tarjetas de crédito)
import { HttpError } from '../utils/errores.js';
import { validarProducto, idValido } from '../utils/validaciones.js';
import * as repo from '../repositories/productos.repository.js';

export function listar(categoria) {
  if (categoria && !['cuenta', 'tarjeta'].includes(categoria)) {
    throw new HttpError(400, 'La categoría debe ser cuenta o tarjeta');
  }
  return repo.listar(categoria);
}

export async function obtener(idTexto) {
  const id = idValido(idTexto);
  if (!id) throw new HttpError(400, 'El id debe ser un número entero positivo');
  const p = await repo.buscarPorId(id);
  if (!p) throw new HttpError(404, 'Producto no encontrado');
  return p;
}

export async function crear(datos) {
  const errores = validarProducto(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  return repo.crear(datos);
}

export async function actualizar(idTexto, datos) {
  const id = idValido(idTexto);
  if (!id) throw new HttpError(400, 'El id debe ser un número entero positivo');
  const errores = validarProducto(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  const p = await repo.actualizar(id, datos);
  if (!p) throw new HttpError(404, 'Producto no encontrado');
  return p;
}

export async function eliminar(idTexto) {
  const id = idValido(idTexto);
  if (!id) throw new HttpError(400, 'El id debe ser un número entero positivo');
  if (!(await repo.eliminar(id))) throw new HttpError(404, 'Producto no encontrado');
}
