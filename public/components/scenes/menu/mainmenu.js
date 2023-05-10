import { getButton } from "../../ui/button.js";
import LobbyScene from "../lobby/lobby.js";
import HakkindaScene from "../user/hakkinda.js";
import LoginScene from "../user/login.js";

export default class MainMenu extends Phaser.Scene {
  static KEY = "MainMenu";
  preload() {
    this.load.image("multitank", "assets/logo.png");
    this.load.image("bg", "assets/bg1.png");
  }
  create() {
    this.add.image(400, 300, "bg");
    this.add.image(400, 40, "multitank");

    let centerX = this.cameras.main.width / 2;

    let b1 = getButton(this, "Play", () => {
      this.scene.start(LoginScene.KEY);
    });

    let b2 = getButton(this, "Hakkinda", () => {
      this.scene.start(HakkindaScene.KEY);
    });
    b1.setPosition(centerX, 200);

    Phaser.Actions.AlignTo(
      [b1, b2],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      50
    );
    // buttonContainer.x += 50
  }
}
