export const LOBBYGAME = {
  message: {
    type: "LOBBYGAME",
    ID: "",
    name: "",
    gameid: "",
    started: false,
    speed: 0,
  },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {},
};
