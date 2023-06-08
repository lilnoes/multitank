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
  handle: async function (json, socket) {},
};
