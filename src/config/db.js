// Conexión a Neon usando DATABASE_URL (nunca va escrita en el código)
import pg from 'pg';
import { env } from './env.js';

export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  ssl: { rejectUnauthorized: false },
  max: 5
});

// Atajo: db.query('SELECT ... WHERE id = $1', [id])
export const query = (texto, parametros = []) => pool.query(texto, parametros);
