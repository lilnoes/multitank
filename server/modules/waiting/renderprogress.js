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
    let game = GAMES.get(json.gameid);
    //send to creator's room
    socket.to(game.creator).emit(json.type, json);
  },
};
