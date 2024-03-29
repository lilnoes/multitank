import { UNKNOWNMESSAGE } from "./unknown.js";
import { REGISTERUSERMESSAGE } from "./register/registeruser.js";
import { LOGINMESSAGE } from "./login/login.js";
import { CLIENTCHAT } from "./lobby/clientchat.js";
import { OYUNSETUP } from "./setup/oyunsetup.js";
import { REGISTERGAMEUSER } from "./waiting/registergameuser.js";
import { STARTRENDER } from "./waiting/startrender.js";
import { RENDERPROGRESS } from "./waiting/renderprogress.js";
import { GAMEREADY } from "./playing/gameready.js";
import { GAMEUPDATE } from "./playing/gameupdate.js";
import { GAMEBULLET } from "./playing/gamebullet.js";
import { GAMEUSERINFO } from "./playing/gameuserinfo.js";
import { LOBBYUSER } from "./lobby/lobbyuser.js";
import { Socket } from "socket.io";

const messages = [
  REGISTERUSERMESSAGE,
  LOGINMESSAGE,
  CLIENTCHAT,
  LOBBYUSER,
  OYUNSETUP,
  REGISTERGAMEUSER,
  STARTRENDER,
  RENDERPROGRESS,
  GAMEREADY,
  GAMEUPDATE,
  GAMEBULLET,
  GAMEUSERINFO,
];

/**
 *
 * @param {Socket} socket
 */
export default async function registerEvents(socket) {
  for (let message of messages)
    socket.on(message.message.type, (json, callback) =>
      message.handle(json, socket, callback)
    );
}
// export default async function handleIncomingEvent(socket, event) {
//   for (let message of messages)
//     if (await message.handle(event, socket)) return null;
//   return UNKNOWNMESSAGE;
// }
