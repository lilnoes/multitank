import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { GAMESTART } from "./gamestart.js";

export const GAMEREADY = {
  message: { type: "GAMEREADY", ID: "", gameid: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      let game = GAMES.get(json.gameid);
      let message = {
        ...GAMESTART.message,
        gameid: json.gameid,
        time: game.time,
        users: Array.from(game.users).map(([key, u]) => ({
          name: u.name,
          ID: u.ID,
        })),
      };
      for (let user of game.users.values()) {
        await sendToSocket(CLIENTS.get(user.ID), JSON.stringify(message));
      }
      return true;
    }
    return false;
  },
};
