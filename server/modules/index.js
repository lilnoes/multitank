import { UNKNOWNMESSAGE } from "./unknown.js";
import { REGISTERUSERMESSAGE } from "./register/registeruser.js";
import { LOGINMESSAGE } from "./login/login.js";
import { CLIENTCHATSENT } from "./lobby/clientchatsent.js";
import { LOBBYINIT } from "./lobby/lobbyinit.js";
import { OYUNSETUP } from "./setup/oyunsetup.js";
import { REGISTERGAMEUSER } from "./waiting/registergameuser.js";
import { STARTRENDER } from "./waiting/startrender.js";
import { RENDERPROGRESS } from "./waiting/renderprogress.js";
import { GAMEREADY } from "./playing/gameready.js";

const messages = [
  REGISTERUSERMESSAGE,
  LOGINMESSAGE,
  CLIENTCHATSENT,
  LOBBYINIT,
  OYUNSETUP,
  REGISTERGAMEUSER,
  STARTRENDER,
  RENDERPROGRESS,
  GAMEREADY,
];

/**
 *
 * @param {net.Socket} socket
 * @param {Buffer} event
 */
export default async function handleIncomingEvent(socket, event) {
  for (let message of messages)
    if (await message.handle(event, socket)) return null;
  return UNKNOWNMESSAGE;
}
