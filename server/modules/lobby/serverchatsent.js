import { CLIENTS } from "../../globals.js";

export const SERVERCHATSENT = {
  message: { type: "SERVERCHATSENT", name: "", message: "", ID: "" },
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
      json.message != null
    ) {
      let message = { ...this.message, name: json.name, message: json.message };
      for (let client of CLIENTS.values()) client.write(message);
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
