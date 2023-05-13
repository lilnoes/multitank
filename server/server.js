import net from "net";
import parseIncomingMessage from "./modules/index.js";
import { CLIENTS } from "./globals.js";

const server = net.createServer((socket) => {
  socket.on("data", async (data) => {
    try {
      socket.setKeepAlive(true, 7200);
      let json = JSON.parse(data.toString());
      console.log("json", json);
      // for (let client of CLIENTS.values()) client.write("emma server");
      // for (let client of CLIENTS.values()) console.log("status", client.closed);
      if (json.ID != null) {
        // console.log("id", json.ID);
        CLIENTS.set(json.ID, socket);
      }
      let res = await parseIncomingMessage(socket, data);
      // console.log("response", res);
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
