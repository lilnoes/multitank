import { getButton } from "../../ui/button.js";

export default class OyunKurScene extends Phaser.Scene {
  static KEY = "OyunKurScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("oyunkur", "assets/html/oyunkur.html");
  }
  create() {
    this.add.image(400, 400, "bg");
    let dom1 = this.add.dom(400, 300).createFromCache("oyunkur");
    let registerButton = getButton(this, "Save", () => {
      // this.scene.start("Register");
    });
    Phaser.Actions.AlignTo(
      [dom1, registerButton],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
    // buttonContainer.x += 50
  }
}
