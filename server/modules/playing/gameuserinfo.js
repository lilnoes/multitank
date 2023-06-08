import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { GAMEEND } from "./gameend.js";

let lastSent = new Date();
export const GAMEUSERINFO = {
  message: {
    type: "GAMEUSERINFO",
    gameid: "",
    ID: "",
    life: 0,
    score: 0,
    name: "",
  },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket) {
    checkEnd(json, socket).then(null);
    let now = new Date();

    //every 15 seconds send to all users
    if (now - lastSent > 15000) {
      socket.broadcast.emit(json.type, json);
      socket.emit(json.type, json);
      lastSent = now;
    } else {
      //send only to the game's users
      socket.to(json.gameid).emit(json.type, json);
      socket.emit(json.type, json);
    }
  },
};

async function checkEnd(json, socket) {
  let game = GAMES.get(json.gameid);
  let user = game.users.get(json.ID);
  user.life = parseFloat(json.life);
  user.score = parseFloat(json.score);
  game.users.set(json.ID, user);
  let stats = [];

  let alive = game.users.size;
  for (let user of game.users.values()) {
    if (user.life < 1) --alive;
    stats.push({ name: user.name, score: user.score });
  }
  if (alive > 1) return;

  stats.sort((a, b) => b.score - a.score);

  let message = { ...GAMEEND.message, gameid: json.gameid, stats };

  socket.to(json.gameid).emit(message.type, message);
  socket.emit(message.type, message);
}
