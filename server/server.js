import net from "net";
import { CLIENTS } from "./globals.js";
import handleIncomingEvent from "./modules/index.js";

const server = net.createServer((socket) => {
  socket.on("data", async (data) => {
    const events = parseData(data);
    for (let event of events) {
      try {
        if (event.ID != null) CLIENTS.set(event.ID, socket);

        let res = await handleIncomingEvent(socket, event);
      } catch (e) {
        console.log("error handling", e, event);
      }
    }
  });

  socket.on("connect", () => {
    console.log("socket connected");
  });

  socket.on("end", () => console.log("Connection ended"));
});

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

server.listen(9000, () => console.log("Server listening on localhost:9000"));
