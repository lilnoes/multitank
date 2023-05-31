import { isSocketOpen } from "./client/client.js";
import { sleep } from "./client/time.js";
import GameScene from "./components/scenes/game/game.js";
import LiderTablosuScene from "./components/scenes/game/lidertablosu.js";
import OyunBeklemeScene from "./components/scenes/game/oyunbekleme.js";
import OyunKurScene from "./components/scenes/game/oyunkur.js";
import OyunSonuScene from "./components/scenes/game/oyunson.js";
import InitScene from "./components/scenes/initscene.js";
import LobbyScene from "./components/scenes/lobby/lobby.js";
import MainMenu from "./components/scenes/menu/mainmenu.js";
import HakkindaScene from "./components/scenes/user/hakkinda.js";
import LoginScene from "./components/scenes/user/login.js";
import RegisterScene from "./components/scenes/user/register.js";

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "phaserdata",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);
// game.registry.set("ID", Math.random().toString());
// game.registry.set("name", "Leon" + Math.random().toString().substring(0, 4));

(async () => {
  // game.scene.add(InitScene.KEY, InitScene, true);
  //sleep for 1 sec to wait for socket load
  // await sleep(1000);
  game.scene.add(RegisterScene.KEY, RegisterScene, false);
  game.scene.add(LoginScene.KEY, LoginScene, false);
  game.scene.add(MainMenu.KEY, MainMenu, true);
  game.scene.add(LobbyScene.KEY, LobbyScene, false);
  game.scene.add(OyunKurScene.KEY, OyunKurScene, false);
  game.scene.add(OyunBeklemeScene.KEY, OyunBeklemeScene, false);
  game.scene.add(OyunSonuScene.KEY, OyunSonuScene, false);
  game.scene.add(LiderTablosuScene.KEY, LiderTablosuScene, false);
  game.scene.add(HakkindaScene.KEY, HakkindaScene, false);
  game.scene.add(GameScene.KEY, GameScene, false);
})();
