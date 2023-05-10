import { getButton } from "../../ui/button.js";
import MainMenu from "../menu/mainmenu.js";

export default class HakkindaScene extends Phaser.Scene {
  static KEY = "HakkindaScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("hakkinda", "assets/html/hakkinda.html");
  }
  create() {
    this.add.image(400, 400, "bg");
    let dom1 = this.add.dom(400, 300).createFromCache("hakkinda");
    let registerButton = getButton(this, "Homepage", () => {
      this.scene.start(MainMenu.KEY);
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
