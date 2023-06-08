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
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    socket.to(json.gameid).emit(json.type, json);
    socket.emit(json.type, json);
  },
};
