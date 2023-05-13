import { NEWGAMEUSER } from "../../../../server/modules/waiting/newgameuser.js";
import { REGISTERGAMEUSER } from "../../../../server/modules/waiting/registergameuser.js";
import { getButton } from "../../ui/button.js";
import GameScene from "./game.js";

export default class OyunBeklemeScene extends Phaser.Scene {
  static KEY = "OyunBeklemeScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
  }
  create({ gameid, owner = false }) {
    this.users = new Set();
    const socket = this.registry.get("socket");
    const ID = this.registry.get("ID");
    const name = this.registry.get("name");
    const handleNewGameUser = (data) => {
      data = JSON.parse(data.toString());
      if (data.type != NEWGAMEUSER.message.type) return;
      if (data.gameid != gameid) return;
      this.addToGroup(data.name);
    };

    socket.on("data", handleNewGameUser);
    let message = { ...REGISTERGAMEUSER.message, ID, name, gameid };
    socket.write(JSON.stringify(message));
    this.events.on("shutdown", () => {
      socket.removeListener("data", handleNewGameUser);
    });
    this.gameid = gameid;
    this.owner = owner;
    window.data = this.data;
    this.add.image(400, 400, "bg");
    this.oyuncuButton = getButton(this, "Oyuncular", () => {
      // this.scene.start("Register");
    }).setPosition(400, 50);

    this.group = this.add.group();
    getButton(this, "Start", () => {
      this.scene.start(GameScene.KEY);
    })
      .setPosition(400, 500)
      .setVisible(owner);
  }

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
