import WebSocket, { WebSocketServer } from "ws";
import { handleMessage } from "./handlers/messageHandlers";
import { ExtendedWebSocket } from "./types";

import { cerrarConexion as authSocketCerrarConexion } from "./handlers/authSocket";

export default function setupWebSocketServer(port: number): void {
  const wss = new WebSocketServer({ port });
  console.log(`Servidor WebSocket escuchando en el puerto ${port}`);

  wss.on("connection", (ws: ExtendedWebSocket) => {
    console.log("Conexión establecida");

    ws.on("message", (message: WebSocket.RawData) => {
      handleMessage(ws, message);
    });

    ws.on("close", () => {
      authSocketCerrarConexion(ws);
    });
  });
}
