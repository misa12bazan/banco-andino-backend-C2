// Capa service: pago SIMULADO de un plan de tarjeta de crédito junto con la solicitud de apertura.
// El monto sale de la base de datos (no del navegador). Nunca se guarda el número completo ni el CVV.
import { HttpError } from '../utils/errores.js';
import { validarPago, validarSolicitud, limpiarNumero, marcaTarjeta } from '../utils/validaciones.js';
import * as productos from '../repositories/productos.repository.js';
import * as solicitudes from '../repositories/solicitudes.repository.js';
import * as pagos from '../repositories/pagos.repository.js';
import { generarCodigo } from './solicitudes.service.js';

export async function pagarYRegistrar(datos, usuario) {
  const errores = [...validarPago(datos), ...validarSolicitud(datos.solicitud || {})];
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);

  const producto = await productos.buscarPorId(Number(datos.id_producto));
  if (!producto) throw new HttpError(404, 'Plan no encontrado');
  if (producto.categoria !== 'tarjeta') throw new HttpError(400, 'El plan elegido no es una tarjeta de crédito');
  const monto = Number(producto.costo_mensual);
  if (monto <= 0) throw new HttpError(400, 'Este plan no tiene costo: no requiere pago');

  // Todo está validado: recién ahora se escribe en la base de datos
  const solicitud = await solicitudes.crear({ ...datos.solicitud, estado: 'registrado' }, usuario.id, generarCodigo());
  const numero = limpiarNumero(datos.numero_tarjeta);
  const pago = await pagos.crear({
    idUsuario: usuario.id, idSolicitud: solicitud.id, idProducto: producto.id, monto,
    titular: String(datos.titular).trim(), ultimos4: numero.slice(-4), marca: marcaTarjeta(numero)
  });
  return { pago, solicitud };
}

export const listarMios = idUsuario => pagos.listarPorUsuario(idUsuario);
