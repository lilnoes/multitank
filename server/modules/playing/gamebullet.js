import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { GAMESTART } from "./gamestart.js";

export const GAMEBULLET = {
  message: {
    type: "GAMEBULLET",
    gameid: "",
    ID: "",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
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
      let game = GAMES.get(json.gameid);
      // console.log("update", json);

      for (let user of game.users.values()) {
        if (user.ID == json.ID) continue;
        await sendToSocket(CLIENTS.get(user.ID), json);
      }
      return true;
    }
    return false;
  },
};
