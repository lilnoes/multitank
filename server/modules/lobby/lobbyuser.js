import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYINIT } from "./lobbyinit.js";
import { SERVERCHATSENT } from "./serverchatsent.js";

export const LOBBYUSER = {
  message: { type: "LOBBYUSER", ID: "", name: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    if (json.type == this.message.type) {
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
