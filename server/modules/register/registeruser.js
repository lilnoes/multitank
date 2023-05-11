import { IDMESSAGE } from "./id.js";

export const REGISTERUSERMESSAGE = {
  message: { type: "REGISTERUSER", name: "", password: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    if (
      json.type == this.message.type &&
      json.name != null &&
      json.password != null
    ) {
      let id = await registerUser(json.name, json.email, json.password);
      let message = { ...IDMESSAGE.message, id };
      socket.write(JSON.stringify(message));
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
  let id = await saveUser(name, email, password);
  console.log("saved", id);
  return id;
}
