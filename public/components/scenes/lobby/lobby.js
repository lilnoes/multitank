import { getButton } from "../../ui/button.js";

export default class LobbyScene extends Phaser.Scene {
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("login", "assets/html/login.html");
  }
  create() {
    this.add.image(400, 400, "bg");
    const users = ["User 1", "User2"];
    const games = ["Game 1", "Game 2"];
    let usersGroup = this.add.group();
    let gamesGroup = this.add.group();
    usersGroup.add(
      getButton(this, "Oyuncu Listesi", () => {
        // this.scene.start("Register");
        console.log("oyuncu");
      })
    );
    gamesGroup.add(
      getButton(this, "Oyun Listesi", () => {
        // this.scene.start("Register");
        console.log("oyun");
      })
    );
    usersGroup.getChildren()[0].setPosition(150, 60);
    gamesGroup.getChildren()[0].setPosition(500, 60);
    for (let user of users) {
      let text = this.add.text(0, 0, user);
      let children = usersGroup.getChildren();
      let last = children[children.length - 1];
      usersGroup.add(text);
      Phaser.Actions.AlignTo(
        [last, text],
        Phaser.Display.Align.BOTTOM_LEFT,
        null,
        10
      );
    }
    for (let oyun of games) {
      let text = this.add.text(0, 0, oyun);
      let children = gamesGroup.getChildren();
      let last = children[children.length - 1];
      gamesGroup.add(text);
      Phaser.Actions.AlignTo(
        [last, text],
        Phaser.Display.Align.BOTTOM_LEFT,
        null,
        10
      );
    }
    this.add.text(10, 500, "Leon is playing well", {wordWrap: {width: 100}});
    this.cameras.main.setSize(1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.usersCamera = this.cameras.add(0, 0, 400, 400);
    this.gamesCamera = this.cameras.add(400, 0, 400, 400);
    this.chatCamera = this.cameras.add(0, 400, 800, 200);
    this.gamesCamera.scrollX = 300;
    this.chatCamera.scrollY = 400;

    // buttonContainer.x += 50
  }
  update() {
    if (this.cursors.down.isDown) {
      this.usersCamera.scrollY += 5;
    }
  }
}
