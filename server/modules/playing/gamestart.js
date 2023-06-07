import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";

export const GAMESTART = {
  message: {
    type: "GAMESTART",
    ID: "",
    gameid: "",
    speed: 0,
    users: [{ name: "", ID: "", x: 1, y: 1, angle: 0 }],
  },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      return true;
    }
    return false;
  },
};
