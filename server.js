import { CLIENTS } from "./server/globals.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import registerEvents from "./server/modules/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PUBLIC_FOLDER = path.join(__dirname, "public");
app.use(express.static(PUBLIC_FOLDER));
app.use("/server", express.static(path.join(__dirname, "server")));

io.on("connection", (socket) => {
  CLIENTS.set(socket.id, socket);
  registerEvents(socket)
    .then(null)
    .catch((res) => {
      console.log("error in registering events", res);
    });

  //remove socket from clients
  socket.on("end", () => console.log("Connection ended"));
});

server.listen(9000, () => console.log("Server listening on localhost:9000"));
