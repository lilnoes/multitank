const net = require("net");
/**
 *
 * @param {net.Socket} socket
 * @return {Promise<net.Socket>}
 */
export async function isSocketOpen(socket, game = null) {
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
      if (game == null) return;
      const events = parseData(data);
      for (let event of events) {
        if (event.type != null) game.events.emit(event.type, event);
        console.log("event", event);
      }
    });
    client.on("connect", () => {
      console.log("connected");
      res(client);
    });
  });
}

export function sendMessage(socket, message) {
  try {
    socket.write(JSON.stringify(message) + "\r\n");
  } catch (e) {
    console.log("error sending", e, message);
  }
}

function parseData(data) {
  const events = [];
  for (let json of data.toString().trim().split("\r\n")) {
    try {
      json = JSON.parse(json);
      events.push(json);
    } catch (e) {
      console.log("error parsing data", data);
    }
  }
  return events;
}
