import { GAMEREADY } from "../../../../server/modules/playing/gameready.js";
import { CLIENTSTARTRENDER } from "../../../../server/modules/waiting/clientstartrender.js";
import { NEWGAMEUSER } from "../../../../server/modules/waiting/newgameuser.js";
import { REGISTERGAMEUSER } from "../../../../server/modules/waiting/registergameuser.js";
import { RENDERPROGRESS } from "../../../../server/modules/waiting/renderprogress.js";
import { STARTRENDER } from "../../../../server/modules/waiting/startrender.js";
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
      data = JSON.parse(data.toString());
      if (data.type != NEWGAMEUSER.message.type) return;
      if (data.gameid != gameid) return;
      this.addToGroup(data.name);
    };

    this.socket.on("data", handleNewGameUser);
    let message = { ...REGISTERGAMEUSER.message, ID: this.ID, name, gameid };
    this.socket.write(JSON.stringify(message));
    this.events.on("shutdown", () => {
      this.socket.removeListener("data", handleNewGameUser);
    });
    this.add.image(400, 400, "bg");
    this.oyuncuButton = getButton(this, "Oyuncular", () => {
      // this.scene.start("Register");
    }).setPosition(400, 50);

    this.group = this.add.group();
    getButton(this, "Start", () => {
      this.socket.on("data", this.handleStartRender);
      let message = { ...STARTRENDER.message, gameid };
      this.socket.write(JSON.stringify(message));
    })
      .setPosition(400, 500)
      .setVisible(owner);
  }

  handleStartRender = async (data) => {
    data = JSON.parse(data.toString());
    if (data.type != CLIENTSTARTRENDER.message.type) return;
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
      await sleep(40);
      this.socket.write(JSON.stringify(message));
    });
    this.scene.get(GameScene.KEY).events.once("start", () => {
      this.scene.setVisible(false, GameScene.KEY);
    });
    await sleep(2000);
    let message = { ...GAMEREADY.message, gameid: this.gameid };
    this.socket.write(JSON.stringify(message));
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
