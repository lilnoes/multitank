import { IDMESSAGE } from "./id.js";

export const REGISTERUSERMESSAGE = {
  message: { type: "REGISTERUSER", name: "", password: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");
    if (
      json.type == this.message.type &&
      json.name != null &&
      json.password != null
    ) {
      let { id, name } = await registerUser(
        json.name,
        json.email,
        json.password
      );
      let message = { ...IDMESSAGE.message, id, name };
      await sendToSocket(socket, message);
    }
    return false;
  },
};
/**
 *
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
async function registerUser(name, email, password) {
  const { saveUser } = await import("../../utils/db.js");
  let user = await saveUser(name, email, password);
  // console.log("saved", id);
  return { id: user.id, name: user.name };
}
