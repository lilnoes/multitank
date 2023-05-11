import net from "net";
import parseIncomingMessage from "./modules/index.js";
import { CLIENTS } from "./globals.js";

const server = net.createServer((socket) => {
  socket.on("data", async (data) => {
    if (!CLIENTS.has(socket.remoteAddress)) {
      CLIENTS.set(socket.remoteAddress, socket);
      console.log("new connection", CLIENTS.size);
    }
    socket.setKeepAlive(true, 7200);
    console.log("id", socket.remoteAddress);
    socket.id = 1000;
    try {
      let res = await parseIncomingMessage(socket, data);
      console.log(res);
      // console.log(parseIncomingMessage(ws, data));
    } catch (e) {
      console.log("error while parsing", data.toString(), e);
    }
  });

  socket.on("connect", () => {
    console.log("socket connected");
  });

  socket.on("end", () => console.log("Connection ended"));
});

server.listen(9000, () => console.log("Server listening on localhost:9000"));
