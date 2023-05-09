import MainMenu from "./components/menu/main.js";
import LobbyScene from "./components/scenes/lobby/lobby.js";
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
game.scene.add("Register", RegisterScene, false);
game.scene.add("Login", LoginScene, false);
game.scene.add("MainMenu", MainMenu, false);
game.scene.add("Lobby", LobbyScene, true);
