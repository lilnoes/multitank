import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { GAMESTART } from "./gamestart.js";

export const GAMEREADY = {
  message: { type: "GAMEREADY", ID: "", gameid: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    let game = GAMES.get(json.gameid);
    let positions = await getPositions(game.users.size);
    let index = 0;
    let message = {
      ...GAMESTART.message,
      gameid: json.gameid,
      speed: game.speed,
      users: Array.from(game.users).map(([key, u]) => ({
        name: u.name,
        ID: u.ID,
        x: positions[index++].x,
        y: positions[index++].y,
        angle: 0,
      })),
    };

    socket.to(json.gameid).emit(message.type, message);
    socket.emit(message.type, message);
  },
};


