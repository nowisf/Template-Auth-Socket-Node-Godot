import pool from "@db/pool";

export interface DBUser {
  id: number;
  nombre: string;
  email?: string;
  password_hash: string;
}

export async function findUserByNombre(nombre: string): Promise<DBUser | null> {
  const res = await pool.query("SELECT * FROM usuarios WHERE nombre = $1", [
    nombre,
  ]);
  return res.rows[0] || null;
}

export async function findUserByCorreo(email: string): Promise<DBUser | null> {
  const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  return res.rows[0] || null;
}

export async function createUser(
  nombre: string,
  email: string,
  passwordHash: string
) {
  await pool.query(
    `INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) ON CONFLICT (nombre) DO NOTHING`,
    [nombre, email, passwordHash]
  );
}
