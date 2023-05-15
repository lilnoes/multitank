import { GAMEUSERINFO } from "../../../../server/modules/playing/gameuserinfo.js";
import { getSocketID } from "../../../client/utils.js";
import { getButton } from "../../ui/button.js";
import LobbyScene from "../lobby/lobby.js";

export default class LiderTablosuScene extends Phaser.Scene {
  static KEY = "LiderTablosuScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
  }
  create() {
    [this.socket, this.ID] = getSocketID(this);
    this.game.events.on(GAMEUSERINFO.message.type, this.handleGameUserInfo);
    this.events.on("shutdown", () => {
      this.game.events.off(GAMEUSERINFO.message.type, this.handleGameUserInfo);
    });
    this.add.image(400, 400, "bg");
    this.oyuncuButton = getButton(this, "Lider Tablosu", () => {
      // this.scene.start("Register");
    }).setPosition(400, 50);
    getButton(this, "Geri", () => {
      this.scene.switch(LobbyScene.KEY);
    }).setPosition(100, 500);
    this.group = this.add.group();
    // registerButton.setPosition(400, 500);
    this.addToGroup("Name", "Score", "title");
  }

  handleGameUserInfo = (data) => {
    this.addToGroup(data.name, data.score, data.ID);
  };

  addToGroup(name, score, ID) {
    let children = this.group.getChildren();
    let last = this.oyuncuButton;
    if (children.length > 0) last = children[children.length - 1];
    let containers = this.group.getMatching("ID", ID);
    let container, t1, t2;
    if (containers.length > 0) {
      container = containers[0];
      t1 = container.getAt(0);
      t2 = container.getAt(1);
      t1.text = name;
      t2.text = score.toString();
    } else {
      container = this.add.container(0, 0);
      container.ID = ID;
      t1 = this.add
        .text(0, 0, name, { wordWrap: { width: 90, useAdvancedWrap: true } })
        .setOrigin(0, 0);
      t2 = this.add.text(0, 0, score);
      t2.setOrigin(0, 0);
      container.add(t1);
      container.add(t2);
      container.setSize(180, t1.height + 5);
      this.group.add(container);

      Phaser.Actions.AlignTo(
        [last, container],
        Phaser.Display.Align.BOTTOM_LEFT,
        null,
        30
      );

      Phaser.Actions.GridAlign([t1, t2], {
        cellHeight: t1.height + 5,
        cellWidth: 90,
        x: t1.x,
        y: t1.y,
      });
    }
  }
}
