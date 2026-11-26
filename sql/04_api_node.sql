-- Ejecutar en Neon > SQL Editor, UNA sola vez, después de 01, 02 y 03.
-- Prepara la base para la API en Node.

-- 1) Contraseñas cifradas (bcrypt). Antes estaban en texto plano ('1234').
--    Las cuentas de prueba siguen entrando con la clave 1234.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
UPDATE usuarios
SET contrasena = crypt(contrasena, gen_salt('bf', 10))
WHERE contrasena NOT LIKE '$2%';

-- 2) Tabla de productos: cuentas y planes de tarjetas de crédito (antes estaban fijos en servicios.html)
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(20) NOT NULL CHECK (categoria IN ('cuenta','tarjeta')),
  descripcion TEXT NOT NULL,
  costo_mensual NUMERIC(10,2) NOT NULL CHECK (costo_mensual >= 0),
  beneficios TEXT,
  activo BOOLEAN NOT NULL DEFAULT true,
  fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO productos (nombre, categoria, descripcion, costo_mensual, beneficios)
SELECT * FROM (VALUES
 ('Cuenta Independiente', 'cuenta', 'Para quien factura y cobra por su cuenta.', 0, 'Apertura 100% online|Link de pago para cobrar|Sin mantenimiento'),
 ('Cuenta Mype Emprende', 'cuenta', 'Para negocios que recién formalizan sus operaciones.', 12, 'Pagos a proveedores|Transferencias interbancarias|Atención prioritaria'),
 ('Cuenta Mype Crece', 'cuenta', 'Para negocios con planilla y proveedores fijos.', 25, 'Pago de planilla|Líneas de crédito|Ejecutivo asignado'),
 ('Tarjeta de Crédito Clásica', 'tarjeta', 'Tu primera tarjeta, con línea de crédito inicial.', 0, 'Sin cuota de manejo el primer año|Compras online seguras|Cuotas sin interés'),
 ('Tarjeta de Crédito Oro', 'tarjeta', 'Mayor línea y descuentos en comercios aliados.', 15, 'Descuentos en comercios aliados|Seguro de compras|Línea ampliada'),
 ('Tarjeta de Crédito Platinum', 'tarjeta', 'Para negocios y consumos altos, con beneficios premium.', 35, 'Acceso a salas VIP|Seguro de viaje|Atención 24/7')
) AS v(nombre, categoria, descripcion, costo_mensual, beneficios)
WHERE NOT EXISTS (SELECT 1 FROM productos);

-- 3) Verificación para la captura
SELECT categoria, count(*) FROM productos GROUP BY categoria;
SELECT correo, left(contrasena, 7) AS inicio_hash FROM usuarios LIMIT 3;
