import { CLIENTS } from "../../globals.js";
import { SERVERCHATSENT } from "./serverchatsent.js";

export const CLIENTCHATSENT = {
  message: { type: "CLIENTCHATSENT", name: "", message: "", ID: "" },
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
      let message = {
        ...SERVERCHATSENT.message,
        name: json.name,
        message: json.message,
        ID: json.ID,
      };
      // socket.
      for (let client of CLIENTS.values()) {
        // console.log("client", client.closed);
        console.log(client.remoteAddress);
        client.write(JSON.stringify(message));
      }
      return true;
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
  // console.log("logged in", id);
  return id;
}
