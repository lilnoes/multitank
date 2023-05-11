import { LOGINMESSAGE } from "../../../../server/modules/login/login.js";
import { IDMESSAGE } from "../../../../server/modules/register/id.js";
import { isSocketOpen } from "../../../client/client.js";
import { getButton } from "../../ui/button.js";
import LobbyScene from "../lobby/lobby.js";
import RegisterScene from "./register.js";

export default class LoginScene extends Phaser.Scene {
  static KEY = "LoginScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("login", "assets/html/login.html");
  }
  create() {
    this.add.image(400, 400, "bg");
    let dom1 = this.add.dom(400, 300).createFromCache("login");
    let registerButton = getButton(this, "Register", () => {
      this.scene.start(RegisterScene.KEY);
    });
    let loginButton = getButton(this, "Login", async () => {
      await this.sendData();
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
  async sendData() {
    let socket = await isSocketOpen(this.registry.get("socket"));
    socket.removeListener("data", this.idListener);
    socket.addListener("data", this.idListener);
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    socket.write(
      JSON.stringify({
        type: LOGINMESSAGE.message.type,
        email,
        password,
      })
    );
  }

  idListener = async (data) => {
    let message = JSON.parse(data.toString());
    if (message.type == IDMESSAGE.message.type) {
      this.registry.set("id", message.id);
      console.log("received id", data.toString());
      this.scene.start(LobbyScene.KEY);
    }
  };
}
