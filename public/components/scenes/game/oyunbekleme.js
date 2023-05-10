import { getButton } from "../../ui/button.js";

export default class OyunBeklemeScene extends Phaser.Scene {
  static KEY = "OyunBeklemeScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
  }
  create() {
    this.add.image(400, 400, "bg");
    this.oyuncuButton = getButton(this, "Oyuncular", () => {
      // this.scene.start("Register");
    }).setPosition(400, 50);
    this.group = this.add.group();
    let registerButton = getButton(this, "Start", () => {
      // this.scene.start("Register");
    });
    registerButton.setPosition(400, 500);
    this.addToGroup("Leon");
    this.addToGroup("Emma");
    // Phaser.Actions.AlignTo(
    //   [registerButton],
    //   Phaser.Display.Align.BOTTOM_LEFT,
    //   null,
    //   10
    // );
    // buttonContainer.x += 50
  }
  addToGroup(name) {
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
