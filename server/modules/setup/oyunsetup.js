import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";

export const OYUNSETUP = {
  message: { type: "OYUNSETUP", ID: "", name: "", speed: 0, gameid: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    GAMES.set(json.gameid, {
      name: json.name,
      gameid: json.gameid,
      speed: json.speed,
      started: false,
      creator: json.ID,
      users: new Map(),
    });

    //join the room
    socket.join(json.gameid);

    for (let game of GAMES.values()) {
      let message = {
        ...LOBBYGAME.message,
        ...game,
        creator: 1,
        users: game.users.size,
      };
      //send to all clients
      socket.broadcast.emit(message.type, message);
    }
  },
};
/**
 *
 * @param {String} email
 * @param {String} password
 */
async function loginUser(email, password) {
  const { loginUser } = await import("../../utils/db.js");
  let id = await loginUser(email, password);
  // console.log("logged in", id);
  return id;
}
