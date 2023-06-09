import { LOGINMESSAGE } from "../../../../server/modules/login/login.js";
import { IDMESSAGE } from "../../../../server/modules/register/id.js";
import { isSocketOpen, sendMessage } from "../../../client/client.js";
import { getSocketID } from "../../../client/utils.js";
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
    // [this.socket, this.ID] = getSocketID(this);
    // this.game.events.on(IDMESSAGE.message.type, this.idListener);
    this.add.image(400, 400, "bg");
    let dom1 = this.add.dom(400, 300).createFromCache("login");
    let registerButton = getButton(this, "Register", () => {
      this.scene.start(RegisterScene.KEY);
    });
    let loginButton = getButton(this, "Login", async () => {
      await this.sendData();
    });
    const hostButton = getButton(this, "Save Host", async () => {
      let host = document.getElementById("host").value;
      const socket = await isSocketOpen(null, this, host);
      // console.log(socket);
      if (socket == null) return;
      hostButton.setVisible(false);
      const elt = document.getElementById("hostdiv");
      elt.style.display = "none";
      // this.registry.set("socket", socket);
      // console.log(host);
    });

    let buttonContainer = this.add.container(200, 100).setSize(200, 100);
    buttonContainer.add([loginButton, registerButton, hostButton]);

    Phaser.Actions.AlignTo(
      [loginButton, registerButton, hostButton],
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
    // this.game.events.off(IDMESSAGE.message.type, this.idListener);
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = { ...LOGINMESSAGE.message, email, password };
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
