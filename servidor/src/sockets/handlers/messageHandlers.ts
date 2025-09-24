import { ExtendedWebSocket } from "../types";
import { manejadoresMensajesAuth } from "./authSocket";

import { RawData } from "ws"; // Importa explícitamente el tipo RawData

function procesarMensaje(
  ws: ExtendedWebSocket,
  data: any,
  manejadores: Record<string, (ws: ExtendedWebSocket, data: any) => void>
): boolean {
  if (manejadores[data.type]) {
    manejadores[data.type](ws, data);
    return true;
  }
  return false;
}

export function handleMessage(ws: ExtendedWebSocket, message: RawData): void {
  const data = JSON.parse(message.toString());

  if (
    procesarMensaje(ws, data, manejadoresMensajesAuth) //||
    // procesarMensaje(ws, data, manejadoresMensajesVersion) ||
    // procesarMensaje(ws, data, manejadoresMensajesSlot) ||
    // procesarMensaje(ws, data, manejadoresMensajesCombate)
  ) {
    return;
  }

  console.warn("Tipo de mensaje no reconocido:", data.type);
}
