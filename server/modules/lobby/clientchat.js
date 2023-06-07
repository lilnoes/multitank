export const CLIENTCHAT = {
  message: { type: "CLIENTCHAT", name: "", message: "", ID: "" },
  /**
   *
   * @param {String} data
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    let message = {
      ...this.message,
      name: json.name,
      message: json.message,
      ID: json.ID,
    };
    socket.emit(message.type, message);
    socket.broadcast.emit(message.type, message);
  },
};
