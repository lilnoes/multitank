import { CLIENTS } from "../../globals.js";
import { SERVERCHATSENT } from "./serverchatsent.js";

export const CLIENTCHAT = {
  message: { type: "CLIENTCHAT", name: "", message: "", ID: "" },
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
      json.name != null &&
      json.message != null
    ) {
      let message = {
        ...this.message,
        name: json.name,
        message: json.message,
        ID: json.ID,
      };
      // socket.
      for (let client of CLIENTS.values()) {
        // console.log("client", client.closed);
        // console.log(client.remoteAddress);

        // client.write(JSON.stringify(message));
        await sendToSocket(client, message);
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
