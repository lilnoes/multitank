import { CLIENTS, GAMES, USERS } from "../../globals.js";

export const GAMEUPDATE = {
  message: {
    type: "GAMEUPDATE",
    ID: "",
    gameid: "",
    x: 0,
    y: 0,
    angle: 0,
    life: 0,
    score: 0,
  },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    socket.to(json.gameid).emit(json.type, json);
  },
};
