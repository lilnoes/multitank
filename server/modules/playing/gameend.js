import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { GAMESTART } from "./gamestart.js";

export const GAMEEND = {
  message: {
    type: "GAMEEND",
    gameid: "",
    ID: "",
    stats: [],
  },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    let game = GAMES.get(json.gameid);
    if (json.type == this.message.type) {
      for (let user of game.users.values()) {
        await sendToSocket(CLIENTS.get(user.ID), json);
      }
      return true;
    }
    return false;
  },
};
