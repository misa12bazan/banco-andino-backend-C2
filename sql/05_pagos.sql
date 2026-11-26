-- Ejecutar en Neon > SQL Editor, UNA sola vez (después de 04_api_node.sql).
-- Pagos simulados de planes de tarjeta de crédito. NUNCA se guarda el número completo ni el CVV: solo los últimos 4 dígitos.
CREATE TABLE IF NOT EXISTS pagos (
  id SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuarios(id),
  id_solicitud INT REFERENCES solicitudes_apertura_cuenta(id) ON DELETE SET NULL,
  id_producto INT REFERENCES productos(id) ON DELETE SET NULL,
  monto NUMERIC(10,2) NOT NULL CHECK (monto >= 0),
  titular VARCHAR(100) NOT NULL,
  tarjeta_ultimos4 CHAR(4) NOT NULL,
  marca VARCHAR(20) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'aprobado' CHECK (estado IN ('aprobado','rechazado')),
  fecha_pago TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Verificación para la captura
SELECT count(*) AS pagos FROM pagos;
