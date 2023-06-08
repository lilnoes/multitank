import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { NEWGAMEUSER } from "./newgameuser.js";

export const REGISTERGAMEUSER = {
  message: { type: "REGISTERGAMEUSER", ID: "", name: "", gameid: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const user = {
      ID: json.ID,
      name: json.name,
      x: 0,
      y: 0,
      angle: 0,
      score: 0,
      life: 100,
    };

    socket.join(json.gameid);

    const game = GAMES.get(json.gameid);
    game.users.set(json.ID, user);
    GAMES.set(json.gameid, game);
    for (let user of GAMES.get(json.gameid).users.values()) {
      let message = {
        ...NEWGAMEUSER.message,
        gameid: json.gameid,
        name: user.name,
      };

      socket.to(json.gameid).emit(message.type, message);
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
