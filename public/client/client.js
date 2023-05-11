const net = require("net");
/**
 *
 * @param {net.Socket} socket
 * @return {Promise<net.Socket>}
 */
export async function isSocketOpen(socket) {
  if (socket != null && !socket.closed) {
    console.log("socket is alive");
    return socket;
  }

  return new Promise((res, rej) => {
    const client = net.createConnection({ port: 9000 }, () => {});
    client.on("connect", () => {
      console.log("connected");
      res(client);
    });
  });
}
