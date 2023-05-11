import { UNKNOWNMESSAGE } from "./unknown.js";
import { REGISTERUSERMESSAGE } from "./register/registeruser.js";
import { LOGINMESSAGE } from "./login/login.js";

const messages = [REGISTERUSERMESSAGE, LOGINMESSAGE];

/**
 *
 * @param {net.Socket} ws
 * @param {Buffer} message
 */
export default async function parseIncomingMessage(socket, data) {
  let json = JSON.parse(data.toString());
  console.log(json);
  if (json.type == null) return UNKNOWNMESSAGE;
  for (let message of messages)
    if (await message.handle(json, socket)) return null;
  return UNKNOWNMESSAGE;
}
