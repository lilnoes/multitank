import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";

export const RENDERPROGRESS = {
  message: { type: "RENDERPROGRESS", ID: "", gameid: "", progress: 0 },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      let game = GAMES.get(json.gameid);
      await sendToSocket(CLIENTS.get(game.creator), json);
      return true;
    }
    return false;
  },
};
