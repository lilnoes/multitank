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
      await isSocketOpen(null, this);
      res();
    });
  }
}
