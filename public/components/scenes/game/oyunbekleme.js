import { GAMEREADY } from "../../../../server/modules/playing/gameready.js";
import { CLIENTSTARTRENDER } from "../../../../server/modules/waiting/clientstartrender.js";
import { NEWGAMEUSER } from "../../../../server/modules/waiting/newgameuser.js";
import { REGISTERGAMEUSER } from "../../../../server/modules/waiting/registergameuser.js";
import { RENDERPROGRESS } from "../../../../server/modules/waiting/renderprogress.js";
import { STARTRENDER } from "../../../../server/modules/waiting/startrender.js";
import { sendMessage } from "../../../client/client.js";
import { sleep } from "../../../client/time.js";
import { getSocketID } from "../../../client/utils.js";
import { getButton } from "../../ui/button.js";
import GameScene from "./game.js";

export default class OyunBeklemeScene extends Phaser.Scene {
  static KEY = "OyunBeklemeScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
  }
  create({ gameid, owner = false }) {
    this.gameid = gameid;
    this.owner = owner;
    this.users = new Set();
    [this.socket, this.ID] = getSocketID(this);
    const name = this.registry.get("name");

    const handleNewGameUser = (data) => {
      // if (data.type != NEWGAMEUSER.message.type) return;
      if (data.gameid != gameid) return;
      this.addToGroup(data.name);
    };

    this.game.events.on(NEWGAMEUSER.message.type, handleNewGameUser);
    let message = { ...REGISTERGAMEUSER.message, ID: this.ID, name, gameid };
    sendMessage(this.socket, message);
    this.events.on("shutdown", () => {
      this.game.events.off(NEWGAMEUSER.message.type, handleNewGameUser);
    });
    this.add.image(400, 400, "bg");
    this.oyuncuButton = getButton(this, "Oyuncular", () => {
      // this.scene.start("Register");
    }).setPosition(400, 50);

    this.group = this.add.group();
    this.game.events.on(CLIENTSTARTRENDER.message.type, this.handleStartRender);
    getButton(this, "Start", () => {
      let message = { ...STARTRENDER.message, gameid };
      sendMessage(this.socket, message);
    })
      .setPosition(400, 500)
      .setVisible(owner);
  }

  handleStartRender = async (data) => {
    // if (data.type != CLIENTSTARTRENDER.message.type) return;
    if (data.gameid != this.gameid) return;
    this.scene.launch(GameScene.KEY, { gameid: this.gameid });
    this.scene.get(GameScene.KEY).load.on("progress", async (val) => {
      let message = {
        ...RENDERPROGRESS.message,
        ID: this.ID,
        gameid: this.gameid,
        progress: val,
      };
      let ms = Math.random() * 500;
      sendMessage(this.socket, message);
    });
    this.scene.get(GameScene.KEY).events.once("start", () => {
      this.scene.setVisible(false, GameScene.KEY);
    });
    if (!this.owner) return;
    await sleep(2000);
    let message = { ...GAMEREADY.message, gameid: this.gameid };
    sendMessage(this.socket, message);
  };

  addToGroup(name) {
    if (this.users.has(name)) return;
    this.users.add(name);
    let children = this.group.getChildren();
    let last = this.oyuncuButton;
    if (children.length > 0) last = children[children.length - 1];
    let text = this.add.text(0, 0, name);
    Phaser.Actions.AlignTo(
      [last, text],
      Phaser.Display.Align.BOTTOM_CENTER,
      null,
      10
    );
    this.group.add(text);
  }
}
