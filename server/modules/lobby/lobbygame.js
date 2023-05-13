import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYINIT } from "./lobbyinit.js";
import { SERVERCHATSENT } from "./serverchatsent.js";

export const LOBBYGAME = {
  message: {
    type: "LOBBYGAME",
    ID: "",
    name: "",
    gameid: "",
    started: false,
    time: 0,
  },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    if (json.type == this.message.type) {
      return true;
    }
    return false;
  },
};
