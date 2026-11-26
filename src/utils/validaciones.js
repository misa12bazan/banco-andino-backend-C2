// Validaciones de datos. Cada función devuelve una lista de errores (vacía = todo bien).
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const vacio = v => v === undefined || v === null || String(v).trim() === '';

export function validarLogin(d = {}) {
  const e = [];
  if (vacio(d.correo)) e.push('El correo es obligatorio');
  if (vacio(d.contrasena)) e.push('La contraseña es obligatoria');
  return e;
}

export function validarCliente(d = {}) {
  const e = [];
  if (vacio(d.nombre)) e.push('El nombre es obligatorio');
  else if (String(d.nombre).trim().length > 100) e.push('El nombre admite máximo 100 caracteres');
  if (vacio(d.correo)) e.push('El correo es obligatorio');
  else if (!CORREO.test(String(d.correo).trim())) e.push('El correo no tiene un formato válido');
  if (vacio(d.contrasena)) e.push('La contraseña es obligatoria');
  else if (String(d.contrasena).length < 4) e.push('La contraseña debe tener al menos 4 caracteres');
  return e;
}

export function validarSolicitud(d = {}, { exigirEstado = false } = {}) {
  const e = [];
  if (vacio(d.nombres)) e.push('Los nombres son obligatorios');
  if (vacio(d.apellidos)) e.push('Los apellidos son obligatorios');
  if (!/^\d{8}$/.test(String(d.dni ?? ''))) e.push('El DNI debe tener 8 dígitos');
  if (!/^9\d{8}$/.test(String(d.telefono ?? ''))) e.push('El teléfono debe tener 9 dígitos y empezar con 9');
  if (!['ahorros', 'corriente', 'sueldo'].includes(d.tipo_cuenta)) e.push('El tipo de cuenta debe ser ahorros, corriente o sueldo');
  if (!['PEN', 'USD'].includes(d.moneda)) e.push('La moneda debe ser PEN o USD');
  const monto = Number(d.monto_inicial);
  if (vacio(d.monto_inicial) || Number.isNaN(monto) || monto < 0) e.push('El monto inicial debe ser un número mayor o igual a 0');
  if (d.estado !== undefined && !['registrado', 'atendido', 'rechazado'].includes(d.estado)) e.push('El estado debe ser registrado, atendido o rechazado');
  if (exigirEstado && d.estado === undefined) e.push('El estado es obligatorio');
  return e;
}

export function validarProducto(d = {}) {
  const e = [];
  if (vacio(d.nombre)) e.push('El nombre es obligatorio');
  if (!['cuenta', 'tarjeta'].includes(d.categoria)) e.push('La categoría debe ser cuenta o tarjeta');
  if (vacio(d.descripcion)) e.push('La descripción es obligatoria');
  const costo = Number(d.costo_mensual);
  if (vacio(d.costo_mensual) || Number.isNaN(costo) || costo < 0) e.push('El costo mensual debe ser un número mayor o igual a 0');
  return e;
}

// Convierte el :id de la URL en número entero positivo (o null si no sirve)
export function idValido(valor) {
  const n = Number(valor);
  return Number.isInteger(n) && n > 0 ? n : null;
}

// ---------- Pago con tarjeta (simulado) ----------
export const limpiarNumero = v => String(v ?? '').replace(/[\s-]/g, '');

// Algoritmo de Luhn: comprueba que el número de tarjeta sea válido
export function luhn(numero) {
  let suma = 0, alternar = false;
  for (let i = numero.length - 1; i >= 0; i--) {
    let n = Number(numero[i]);
    if (alternar) { n *= 2; if (n > 9) n -= 9; }
    suma += n;
    alternar = !alternar;
  }
  return suma % 10 === 0;
}

export function marcaTarjeta(numero) {
  if (/^4/.test(numero)) return 'Visa';
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(numero)) return 'Mastercard';
  if (/^3[47]/.test(numero)) return 'Amex';
  return 'Tarjeta';
}

export function validarPago(d = {}) {
  const e = [];
  if (idValido(d.id_producto) === null) e.push('Debes elegir un plan de tarjeta');
  if (vacio(d.titular)) e.push('El nombre del titular es obligatorio');
  const num = limpiarNumero(d.numero_tarjeta);
  if (!/^\d{13,19}$/.test(num) || !luhn(num)) e.push('El número de tarjeta no es válido');
  const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(String(d.vencimiento ?? ''));
  if (!m) e.push('El vencimiento debe tener el formato MM/AA');
  else {
    const hoy = new Date();
    const anio = 2000 + Number(m[2]), mes = Number(m[1]);
    if (anio < hoy.getFullYear() || (anio === hoy.getFullYear() && mes < hoy.getMonth() + 1)) e.push('La tarjeta está vencida');
  }
  if (!/^\d{3,4}$/.test(String(d.cvv ?? ''))) e.push('El CVV debe tener 3 o 4 dígitos');
  return e;
}
