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
import { GAMEUPDATE } from "./playing/gameupdate.js";
import { GAMEBULLET } from "./playing/gamebullet.js";
import { GAMEUSERINFO } from "./playing/gameuserinfo.js";
import { LOBBYUSER } from "./lobby/lobbyuser.js";

const messages = [
  REGISTERUSERMESSAGE,
  LOGINMESSAGE,
  CLIENTCHATSENT,
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
 * @param {net.Socket} socket
 * @param {Buffer} event
 */
export default async function handleIncomingEvent(socket, event) {
  for (let message of messages)
    if (await message.handle(event, socket)) return null;
  return UNKNOWNMESSAGE;
}
