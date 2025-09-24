import { WebSocket } from "ws";
export interface ExtendedWebSocket extends WebSocket {
  nombreUsuario: string;
  combateActual: null;
  id: number;
  lastSet: number | undefined;
}
