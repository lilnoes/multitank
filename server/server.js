import net from "net";
import parseIncomingMessage from "./modules/index.js";
import { CLIENTS } from "./globals.js";

const server = net.createServer((socket) => {
  socket.on("data", async (data) => {
    try {
      let json = JSON.parse(data.toString());
      console.log("json", json);
      if (json.ID != null) CLIENTS.set(json.ID, socket);

      let res = await parseIncomingMessage(socket, data);
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
