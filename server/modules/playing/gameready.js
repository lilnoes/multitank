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

async function getPositions(n) {
  return [
    {
      x: 200,
      y: 300,
    },
    {
      x: 461.68221005583416,
      y: 109.74936277996872,
    },
    {
      x: 561.9530496262796,
      y: 417.35079768262267,
    },
    {
      x: 238.42156968185486,
      y: 417.8660716912391,
    },
    {
      x: 337.7120971674783,
      y: 109.94680439222725,
    },
  ];
}
