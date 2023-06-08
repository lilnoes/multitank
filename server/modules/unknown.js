export const UNKNOWNMESSAGE = {
  type: "UNKNOWNMESSAGE",
  /**
   *
   * @param {import("./basemessage")} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: function (json, socket) {
    // json
    if (json.type == this.type) return true;
    return false;
  },
};
