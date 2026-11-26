# Banco Andino Perú · Backend (Node + Express + Neon)

API REST por capas del proyecto Banco Andino Perú (Consolidado 2, semanas 13 a 15).

## Arquitectura por capas
`routes/` → `controllers/` → `services/` → `repositories/` → SQL en Neon
- `routes/`: define las URL y qué middlewares usa cada una.
- `controllers/`: reciben la petición HTTP y devuelven la respuesta con su código (200, 201, 400...).
- `services/`: reglas de negocio y validaciones.
- `repositories/`: solo SQL, siempre con parámetros `$1, $2` (evita inyección SQL).
- `middlewares/`: `auth.js` (token JWT, 401), `roles.js` (rol, 403), `turno.js` (turno del empleado, 403), `errores.js`.
- `config/`: `env.js` (variables) y `db.js` (conexión a Neon con `DATABASE_URL`).

## Puesta en marcha local
1. En Neon > SQL Editor ejecuta, en orden, `sql/01_tablas.sql`, `02_datos_prueba.sql`, `03_turnos.sql` y `04_api_node.sql` (si ya ejecutaste 01–03 antes, solo falta el 04).
2. Copia `.env.example` como `.env` y completa `DATABASE_URL` y `JWT_SECRET`.
3. `npm install` y luego `npm run dev`. Prueba en el navegador: http://localhost:3000

## Endpoints
| Método | Ruta | Quién | Respuestas |
|---|---|---|---|
| POST | /api/auth/login | público | 200 token · 400 vacío · 401 clave mala |
| POST | /api/auth/registro | público | 201 · 400 · 409 correo repetido |
| GET | /api/auth/perfil | token | 200 · 401 |
| GET | /api/productos?categoria=tarjeta | público | 200 |
| GET | /api/productos/:id | público | 200 · 404 |
| POST / PUT / DELETE | /api/productos(/:id) | administrador, empleado | 201/200 · 400 · 401 · 403 · 404 |
| GET / POST | /api/clientes | administrador, empleado | 200/201 · 400 · 401 · 403 |
| GET / GET:id / POST / PUT / DELETE | /api/solicitudes | administrador, empleado | 200/201 · 400 · 401 · 403 · 404 |
| GET / GET:id / POST / PUT | /api/mis-solicitudes | cliente | 200/201 · 400 · 401 · 403 · 404 |

El empleado solo puede crear, editar o eliminar dentro de su turno (mañana 06–14, tarde 14–22, noche 22–06, hora de Lima); fuera de turno recibe 403.
Para probarlo, pon `HORA_SIMULADA=3` en `.env` (y déjalo vacío al terminar).

## Cuentas de prueba (clave 1234)
`admin@correo.com` · `empleado1@correo.com` (mañana) · `empleado2@correo.com` (tarde) · `cliente1@correo.com` … `cliente10@correo.com`

## Variables de entorno
`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS`, `PORT`, `HORA_SIMULADA`. Nunca subas el archivo `.env` a GitHub.

## Despliegue en Render
Web Service · Runtime Node · Build `npm install` · Start `npm start` · Plan **Free** · añade las variables de entorno de arriba (en `CORS_ORIGINS` pon el link de Vercel).
