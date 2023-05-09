import { getButton } from "../../ui/button.js";

export default class RegisterScene extends Phaser.Scene {
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("register", "assets/html/register.html");
  }
  create() {
    this.add.image(400, 400, "bg");
    let dom1 = this.add.dom(400, 300).createFromCache("register");
    let registerButton = getButton(this, "Register", () => {
      // this.scene.start("Register");
    });
    let loginButton = getButton(this, "Login", () => {
      this.scene.start("Login");
    });

    let buttonContainer = this.add.container(200, 100).setSize(200, 100);
    buttonContainer.add([registerButton, loginButton]);

    Phaser.Actions.AlignTo(
      [registerButton, loginButton],
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
