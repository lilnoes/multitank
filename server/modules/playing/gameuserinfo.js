import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { GAMESTART } from "./gamestart.js";

export const GAMEUSERINFO = {
  message: {
    type: "GAMEUSERINFO",
    gameid: "",
    ID: "",
    life: 0,
    score: 0,
  },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      for (let client of CLIENTS.values()) {
        await sendToSocket(client, json);
      }
      return true;
    }
    return false;
  },
};
