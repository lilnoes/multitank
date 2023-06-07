import { CLIENTS, GAMES, USERS } from "../../globals.js";
import { LOBBYGAME } from "../lobby/lobbygame.js";
import { GAMEEND } from "./gameend.js";
import { GAMESTART } from "./gamestart.js";

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
    const { sendToSocket } = await import("../../utils/socket.js");

    if (json.type == this.message.type) {
      checkEnd(json).then(null);
      for (let client of CLIENTS.values()) {
        await sendToSocket(client, json);
      }
      return true;
    }
    return false;
  },
};

async function checkEnd(json) {
  const { sendToSocket } = await import("../../utils/socket.js");
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

  for (let user of GAMES.get(json.gameid).users.values()) {
    await sendToSocket(CLIENTS.get(user.ID), message);
  }
}
