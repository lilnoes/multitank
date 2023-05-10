import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import parseIncomingMessage from "./modules/index.js";

const wss = new WebSocketServer({ port: 9000 });

wss.on("connection", (ws) => {
  console.log("so connected");
  ws.on("message", (data) => {
    console.log(parseIncomingMessage(ws, data));
  });
});
