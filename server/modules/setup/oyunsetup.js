import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";

export const OYUNSETUP = {
  message: { type: "OYUNSETUP", ID: "", name: "", time: 0, gameid: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      GAMES.set(json.gameid, {
        name: json.name,
        gameid: json.gameid,
        time: json.time,
        started: false,
        creator: json.ID,
        users: new Map(),
      });
      for (let game of GAMES.values()) {
        let message = {
          ...LOBBYGAME.message,
          ...game,
          creator: 1,
          users: game.users.size,
        };
        for (let client of CLIENTS.values()) {
          await sendToSocket(client, message);
        }
      }
      return true;
    }
    return false;
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
