export const NEWGAMEUSER = {
  message: { type: "NEWGAMEUSER", ID: "", gameid: "", name: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {},
};
