const net = require("net");
/**
 *
 * @param {net.Socket} socket
 * @return {Promise<net.Socket>}
 */
export async function isSocketOpen(socket) {
  if (socket != null) {
    console.log("socket is alive");
    return socket;
  }

  return new Promise((res, rej) => {
    const client = net.createConnection(
      {
        port: 9000,
        keepAlive: true,
        keepAliveInitialDelay: 60000,
        noDelay: true,
      },
      () => {}
    );
    client.on("data", (data) => {
      console.log("data came", data.toString());
    });
    client.on("connect", () => {
      console.log("connected");
      res(client);
    });
  });
}
