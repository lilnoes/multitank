import { getButton } from "../../ui/button.js";

export default class LoginScene extends Phaser.Scene {
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("login", "assets/html/login.html");
  }
  create() {
    this.add.image(400, 400, "bg");
    let dom1 = this.add.dom(400, 300).createFromCache("login");
    let registerButton = getButton(this, "Register", () => {
      this.scene.start("Register");
    });
    let loginButton = getButton(this, "Login", () => {
      console.log("clicked from login");
    });

    let buttonContainer = this.add.container(200, 100).setSize(200, 100);
    buttonContainer.add([loginButton, registerButton]);

    Phaser.Actions.AlignTo(
      [loginButton, registerButton],
      Phaser.Display.Align.RIGHT_CENTER,
      10
    );
    Phaser.Actions.AlignTo(
      [dom1, buttonContainer],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
    // buttonContainer.x += 50
  }
}
