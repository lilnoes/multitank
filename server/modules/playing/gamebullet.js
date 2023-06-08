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
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    // send to all users in this game's room
    socket.to(json.gameid).emit(json.type, json);
  },
};
