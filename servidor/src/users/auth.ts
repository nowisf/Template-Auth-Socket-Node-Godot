import bcrypt from "bcrypt";
import {
  findUserByNombre,
  findUserByCorreo,
  createUser,
} from "@models/userModel";

export async function register(
  nombre: string,
  password: string,
  email?: string
) {
  var mensaje = { ok: true, nombreDisponible: true, emailDisponible: true };
  const existingUser = await findUserByNombre(nombre);
  if (existingUser) {
    mensaje.nombreDisponible = false;
    mensaje.ok = false;
  }

  const existingEmail = await findUserByCorreo(email);
  if (existingEmail) {
    mensaje.emailDisponible = false;
    mensaje.ok = false;
  }
  if (!mensaje.ok) return mensaje;

  const hash = await bcrypt.hash(password, 10);
  await createUser(nombre, email ?? null, hash);
  return mensaje;
}

export async function login(nombre: string, password: string) {
  const user = await findUserByNombre(nombre);
  if (!user) return { ok: false, msg: "Usuario no encontrado" };

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return { ok: false, msg: "Contraseña incorrecta" };

  return { ok: true };
}
