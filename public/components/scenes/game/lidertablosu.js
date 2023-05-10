import { getButton } from "../../ui/button.js";

export default class LiderTablosuScene extends Phaser.Scene {
  static KEY = "LiderTablosuScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
  }
  create() {
    this.add.image(400, 400, "bg");
    this.oyuncuButton = getButton(this, "Lider Tablosu", () => {
      // this.scene.start("Register");
    }).setPosition(400, 50);
    this.group = this.add.group();
    // let registerButton = getButton(this, "Start", () => {
    //   // this.scene.start("Register");
    // });
    // registerButton.setPosition(400, 500);
    this.addToGroup("Name", "Score");
    this.addToGroup("Leon", "100");
    // Phaser.Actions.AlignTo(
    //   [registerButton],
    //   Phaser.Display.Align.BOTTOM_LEFT,
    //   null,
    //   10
    // );
    // buttonContainer.x += 50
  }
  addToGroup(name, time, score) {
    let children = this.group.getChildren();
    let last = this.oyuncuButton;
    if (children.length > 0) last = children[children.length - 1];
    let t1 = this.add
      .text(0, 0, name, { wordWrap: { width: 70, useAdvancedWrap: true } })
      .setOrigin(0, 0);
    let t2 = this.add.text(0, 0, time);
    Phaser.Actions.AlignTo(
      [last, t1],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      30
    );
    Phaser.Actions.GridAlign([t1, t2], {
      cellHeight: t1.height,
      cellWidth: 80,
      x: t1.x,
      y: t1.y,
    });
    this.group.add(t1);
  }
}
