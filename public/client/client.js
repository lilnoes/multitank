/**
 *
 * @param {import("socket.io-client").Socket} socket
 * @return {Promise<import("socket.io-client").Socket>}
 */
export async function isSocketOpen(socket, scene = null, _host = null) {
  if (socket != null) {
    console.log("socket is alive");
    return socket;
  }

  return new Promise((res, rej) => {
    // _host = "tcp://2.tcp.eu.ngrok.io:17960";
    try {
      // const { host, port } = extractHostAndPort(_host);
      const host = _host == null ? "http://localhost:9000" : _host;
      const socket = io(host);
      socket.on("connect", () => {
        scene?.registry?.set("socket", socket);
        scene?.registry?.set("ID", socket.id);
        console.log("connected id", socket.id);
        socket.onAny((event, json) => {
          scene.game.events.emit(event.type, json);
          console.log("event", event, json);
        });
        res(socket);
      });
    } catch (e) {
      console.log("error", e);
      res(null);
    }
  });
}

export function sendMessage(socket, message) {
  socket.emit(message.type, message);
}
