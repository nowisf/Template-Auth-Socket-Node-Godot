import { ExtendedWebSocket } from "../types";
import { login, register } from "@users/auth";

const usuariosConectados = new Set<string>();

// Manejadores de mensajes
export const manejadoresMensajesAuth = {
  login: (ws: ExtendedWebSocket, data: any) => {
    cerrarConexion(ws); //porsiacaso jijisajajisjakjde :)

    const { usuario, clave } = data;
    console.log(`Login:Credenciales recibidas - Usuario: ${usuario}`);

    login(usuario, clave).then((res) => {
      console.log(res);
      ws.send(JSON.stringify({ type: "login_respuesta", ...res }));
      if (res.ok) {
        usuariosConectados.add(usuario);
        ws.nombreUsuario = usuario;
      }
    });
  },
  register: (ws: ExtendedWebSocket, data: any) => {
    var mensaje = {
      type: "register_respuesta",
      mailFree: true,
      userFree: true,
    };
    console.log("Registro recivido data.usuario:", data.usuario);

    register(data.usuario, data.clave, data.email).then((res) => {
      console.log(res);
      ws.send(JSON.stringify({ type: "register_respuesta", ...res }));
    });
  },
  logout: (ws: ExtendedWebSocket) => {
    cerrarConexion(ws);
  },
};

export function cerrarConexion(ws: ExtendedWebSocket) {
  if (ws.nombreUsuario) {
    usuariosConectados.delete(ws.nombreUsuario);
    console.log(`Usuario desconectado: ${ws.nombreUsuario}`);
    ws.nombreUsuario = "";
    ws.send(JSON.stringify({ type: "logout_respuesta", ok: true }));
  }
}
