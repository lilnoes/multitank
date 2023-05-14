import { IDMESSAGE } from "../register/id.js";

export const LOGINMESSAGE = {
  message: { type: "LOGIN", email: "", password: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");
    if (
      json.type == this.message.type &&
      json.email != null &&
      json.password != null
    ) {
      let id = await loginUser(json.email, json.password);
      let message = { ...IDMESSAGE.message, id };
      await sendToSocket(socket, message);
    }
    return false;
  },
};
/**
 *
 * @param {String} email
 * @param {String} password
 */
async function loginUser(email, password) {
  const { loginUser } = await import("../../utils/db.js");
  let id = await loginUser(email, password);
  console.log("logged in", id);
  return id;
}
