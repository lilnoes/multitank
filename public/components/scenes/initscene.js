import { isSocketOpen } from "../../client/client.js";
import { SCENECONFIG } from "../../client/sceneconfig.js";

export default class InitScene extends Phaser.Scene {
  static KEY = "INITSCENE";
  constructor() {
    super(SCENECONFIG);
  }
  preload() {
    this.plugins.get("rexawaitloaderplugin").addToScene(this);
    this.load.rexAwait(async (res, rej) => {
      this.socket = await isSocketOpen(this.registry.get("socket"), this.game);
      this.registry.set("socket", this.socket);

      // this.socket.on("data", (data) => {
      //   console.log("data", data.toString());
      // });
      res();
    });
  }
}
