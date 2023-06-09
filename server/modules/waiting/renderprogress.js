import { CLIENTS, GAMES, RENDER, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { GAMESTART } from "../playing/gamestart.js";

export const RENDERPROGRESS = {
  message: { type: "RENDERPROGRESS", ID: "", gameid: "", progress: 0 },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    await areAllFinished(json, socket);
    //send to creator's room
    // socket.to(game.creator).emit(json.type, json);
    // console.log("rooms", socket.rooms);
  },
};

async function areAllFinished(json, socket) {
  let game = GAMES.get(json.gameid);
  if (game.started) return;
  if (!RENDER.has(json.gameid)) {
    RENDER.set(json.gameid, { started: new Date(), count: 0 });
    setTimeout(async () => {
      let game = GAMES.get(json.gameid);
      // console.log("10 secs");
      if (!game.started) await startGame(json, socket);
    }, 10000);
  }

  let render = RENDER.get(json.gameid);
  if (json.progress > 0.9) {
    render.count += 1;
    RENDER.set(json.gameid, render);
  }
  if (render.count >= game.users.size) await startGame(json, socket);
}

async function startGame(json, socket) {
  {
    let game = GAMES.get(json.gameid);
    game.started = true;
    GAMES.set(json.gameid, game);
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
  }
}

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
