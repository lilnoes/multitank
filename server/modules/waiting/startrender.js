import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { CLIENTSTARTRENDER } from "./clientstartrender.js";

export const STARTRENDER = {
  message: { type: "STARTRENDER", ID: "", gameid: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      for (let user of GAMES.get(json.gameid).users.values()) {
        let message = { ...CLIENTSTARTRENDER.message, gameid: json.gameid };
        await sendToSocket(CLIENTS.get(user.ID), JSON.stringify(message));
      }
      return true;
    }
    return false;
  },
};
