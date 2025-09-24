import { crearTablaUsuarios } from "@db/setup";
import setupWebSocketServer from "./sockets/setupWebSocketServer";

const WEBSOCKET_PORT = 8080;

function main() {
  console.log("Iniciando servidor...");
  // Espera a que se ejecute todo el setup
  crearTablaUsuarios()
    .then(() => {
      console.log("Base de datos lista, iniciando servidor...");
      setupWebSocketServer(WEBSOCKET_PORT);
    })
    .catch(console.error);
}

main();
