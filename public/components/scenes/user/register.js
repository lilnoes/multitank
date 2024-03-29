import { IDMESSAGE } from "../../../../server/modules/register/id.js";
import { REGISTERUSERMESSAGE } from "../../../../server/modules/register/registeruser.js";
import { isSocketOpen, sendMessage } from "../../../client/client.js";
import { getButton } from "../../ui/button.js";
import LobbyScene from "../lobby/lobby.js";
import LoginScene from "./login.js";

export default class RegisterScene extends Phaser.Scene {
  static KEY = "RegisterScene";
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("register", "assets/html/register.html");
    this.listening = false;
  }
  create() {
    this.add.image(400, 400, "bg");
    // this.game.events.on(IDMESSAGE.message.type, this.idListener);
    let dom1 = this.add.dom(400, 300).createFromCache("register");
    let registerButton = getButton(this, "Register", async () => {
      await this.sendData();
    });
    let loginButton = getButton(this, "Login", () => {
      this.scene.start(LoginScene.KEY);
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

  async sendData() {
    // sendMessage()
    let socket = await isSocketOpen(this.registry.get("socket"));
    // this.game.events.off(IDMESSAGE.message.type, this.idListener);
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = { ...REGISTERUSERMESSAGE.message, name, email, password };
    socket.emit(message.type, message, (result) => {
      //success
      if (result.type == IDMESSAGE.message.type) {
        this.registry.set("name", result.name);
        this.scene.start(LobbyScene.KEY);
      } else {
        console.log("error", result);
      }
    });
  }
}
