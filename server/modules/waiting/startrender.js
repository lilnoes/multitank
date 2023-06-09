import { CLIENTSTARTRENDER } from "./clientstartrender.js";

export const STARTRENDER = {
  message: { type: "STARTRENDER", ID: "", gameid: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    let message = { ...this.message, gameid: json.gameid };
    socket.to(json.gameid).emit(message.type, message);
    socket.emit(message.type, message);
  },
};
