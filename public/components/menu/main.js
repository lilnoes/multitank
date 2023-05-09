import { getButton } from "../ui/button.js";

export default class MainMenu extends Phaser.Scene {
  //   preload() {
  //     this.load.html("register", "assets/html/register.html");
  //   }
  create() {
    let centerX = this.cameras.main.width / 2;
    let registerButton = getButton(this, "Register", () => {
      this.scene.start("Register");
    });
    let loginButton = getButton(this, "Login", () => {
      this.scene.start("Login");
    });
    loginButton.setPosition(centerX, 100);

    // let buttonContainer = this.add.container(200, 100).setSize(200, 100);
    // buttonContainer.add([registerButton, loginButton]);

    Phaser.Actions.AlignTo(
      [loginButton, registerButton],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
    // buttonContainer.x += 50
  }
}
