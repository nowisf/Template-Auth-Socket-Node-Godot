import pool from "./pool";

export async function crearTablaUsuarios() {
  await pool
    .query(
      `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      nombre VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(100) NOT NULL,
      creado_en TIMESTAMP DEFAULT NOW()
    )
  `
    )
    .then(() => {
      console.log("Tabla 'usuarios' creada o ya existía");
    });
}
