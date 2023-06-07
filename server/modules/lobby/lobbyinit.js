import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "./lobbygame.js";
import { LOBBYUSER } from "./lobbyuser.js";

export const LOBBYINIT = {
  message: { type: "LOBBYINIT", ID: "", name: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    USERS.add(json.name);

    //send this user to all existing users
    for (let user of USERS.values()) {
      let message = {
        ...LOBBYUSER.message,
        name: user,
      };
      socket.emit(message.type, message);
      socket.broadcast.emit(message.type, message);
    }

    //send all existing games to this user
    for (let game of GAMES.values()) {
      let message = {
        ...LOBBYGAME.message,
        ...game,
        users: 1,
        creator: 1,
      };
      socket.emit(message.type, message);
    }
  },
};
