import { WebSocket } from "ws";
import { REGISTERUSERMESSAGE } from "./register.js";
import { UNKNOWNMESSAGE } from "./unknown.js";

const messages = [REGISTERUSERMESSAGE];

/**
 *
 * @param {WebSocket} ws
 * @param {import("ws").RawData} message
 */
export default function parseIncomingMessage(ws, message) {
  let json = JSON.parse(message.toString());
  if (json.type == null) return UNKNOWNMESSAGE;
  for (let message of messages) if (message.verify(json)) return null;
  return UNKNOWNMESSAGE;
}
