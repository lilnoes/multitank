import { OYUNSETUP } from "../../../../server/modules/setup/oyunsetup.js";
import { sendMessage } from "../../../client/client.js";
import { getUUID } from "../../../client/id.js";
import { getButton } from "../../ui/button.js";
import OyunBeklemeScene from "./oyunbekleme.js";

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
      let socket = this.registry.get("socket");
      let name = document.getElementById("name").value;
      let speed = document.getElementById("charge").value;
      if (name == null || speed == null) return;
      speed = parseInt(speed);
      let ID = this.registry.get("ID");
      let gameid = getUUID();
      let message = { ...OYUNSETUP.message, ID, gameid, name, speed };
      sendMessage(socket, message);
      this.scene.start(OyunBeklemeScene.KEY, { gameid, owner: true });
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
