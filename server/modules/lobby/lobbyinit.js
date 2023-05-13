import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "./lobbygame.js";
import { LOBBYUSER } from "./lobbyuser.js";
import { SERVERCHATSENT } from "./serverchatsent.js";

export const LOBBYINIT = {
  message: { type: "LOBBYINIT", ID: "", name: "" },
  /**
   *
   * @param {String} json
   * @param {net.Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      USERS.add(json.name);

      for (let user of USERS.values()) {
        let message = {
          ...LOBBYUSER.message,
          name: user,
        };
        for (let client of CLIENTS.values()) {
          await sendToSocket(client, JSON.stringify(message));
        }
      }
      for (let game of GAMES.values()) {
        let message = {
          ...LOBBYGAME.message,
          ...game,
        };
        for (let client of CLIENTS.values()) {
          await sendToSocket(client, JSON.stringify(message));
        }
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
