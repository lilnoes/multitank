import { getButton } from "../../ui/button.js";

export default class LobbyScene extends Phaser.Scene {
  preload() {
    this.load.image("bg", "assets/bg1.png");
    this.load.html("chat", "assets/html/chat.html");
  }
  create() {
    const bg = this.add.image(400, 400, "bg");
    this.bg1 = this.add.image(400, 400, "bg").setOrigin(0, 0);
    let dom1 = this.add.dom(30, 400).createFromCache("chat").setOrigin(0, 0);
    dom1.addListener("click");
    dom1.on("click", () => {
      console.log("clicked");
      this.input.keyboard.disableGlobalCapture();
    });
    this.events.on("pause", () => {
      console.log("paused");
      this.input.keyboard.enableGlobalCapture();
    });
    this.events.on("shutdown", () => {
      console.log("shutdown");
      this.input.keyboard.enableGlobalCapture();
    });

    dom1.setDepth(10);
    let sendButton = getButton(this, "Send", async () => {
      console.log("clicked me");
      let textarea = document.getElementById("chat");
      if (textarea.value <= 0) return;
      console.log(textarea.value);
      this.addMessageToGroup("Leon", textarea.value, true);
      textarea.value = "";
    });

    Phaser.Actions.AlignTo(
      [dom1, sendButton],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );

    const users = ["User 1", "User2"];
    const games = ["Game 1", "Game 2"];
    let usersGroup = this.add.group();
    let gamesGroup = this.add.group();
    this.messagesGroup = this.add.group();
    usersGroup.add(
      getButton(this, "Oyuncu Listesi", () => {
        // this.scene.start("Register");
        // console.log("oyuncu");
      })
    );
    gamesGroup.add(
      getButton(this, "Oyun Listesi", () => {
        // this.scene.start("Register");
        // console.log("oyun");
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

    // let m1 = this.getMessageContainer(
    //   "Leon",
    //   "Hello wowe! mana  mana mana mana mana mana mana mana mana mana mana mana mana mana mana mana"
    // );
    // m1.setPosition(800 - 120, 480);
    // this.add.text(10, 500, "Leon is playing well", {wordWrap: {width: 100}});
    this.cameras.main.setSize(1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.usersCamera = this.cameras.add(0, 0, 400, 400);
    this.gamesCamera = this.cameras.add(400, 0, 400, 400);
    this.messagesCamera = this.cameras.add(400, 400, 400, 200);
    this.chatCamera = this.cameras.add(0, 400, 400, 200);
    this.gamesCamera.setScroll(300, 0);
    this.chatCamera.setScroll(0, 400);
    this.messagesCamera.setScroll(400, 400);

    // this.messagesCamera.startFollow(bg, true, 0.5, 0.5);

    this.border = this.add.graphics();

    // Set the line style of the border.
    this.border.lineStyle(4, 0xffffff, 1.0);

    // Draw a rectangle border that matches the size of the camera's view.
    this.border.strokeRect(
      0,
      0,
      this.messagesCamera.width - 20,
      this.messagesCamera.height - 20
    );
    this.border.setDepth(3);

    // this.input.keyboard.disableGlobalCapture();

    // Make sure the border stays on top of other game objects.
    // border.setDepth(1);
    // this.chatCamera.setco

    // buttonContainer.x += 50
  }
  update() {
    // if (this.cursors.down.isDown) {
    //   this.messagesCamera.scrollY += 5;
    // }

    this.bg1.x = this.messagesCamera.scrollX;
    this.bg1.y = this.messagesCamera.scrollY;
    this.border.x = this.messagesCamera.scrollX + 10;
    this.border.y = this.messagesCamera.scrollY + 10;
  }

  addMessageToGroup(displayName, message, isSender) {
    let container = this.getMessageContainer(displayName, message, isSender);
    let children = this.messagesGroup.getChildren();
    let x = isSender ? 420 : 800 - 220;
    let y = 420;
    if (children.length > 0) {
      let last = children[children.length - 1];
      y = last.y + last.height + 10;
    }
    container.setPosition(x, y);
    // container.setDepth(1);
    console.log(this.messagesCamera.scrollY, container.y);
    if (container.y > 580 && this.messagesCamera.scrollY < container.y) {
      let diff = container.y - this.messagesCamera.scrollY - 200;
      this.messagesCamera.scrollY += diff + container.height + 10;
    }
    this.messagesGroup.add(container);
  }

  getMessageContainer(displayName, message) {
    let t1 = this.add
      .text(0, 0, displayName, {
        fontStyle: "bold",
        fontSize: 11,
      })
      .setOrigin(0, 0)
      .setPosition(5, 5);
    let t2 = this.add
      .text(0, 0, message, {
        wordWrap: { width: 200, useAdvancedWrap: true },
      })
      .setOrigin(0, 0);
    let ret = this.add
      .rectangle(0, 0, 200, t1.height + t2.height + 20, 0x101010)
      .setOrigin(0, 0);
    let container = this.add.container(0, 0, [ret, t1, t2]);
    // container.setc
    // Phaser.Display.Align.In.TopLeft(t1, ret, -5, -5);
    Phaser.Actions.AlignTo(
      [t1, t2],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
    container.setSize(ret.width, ret.height);
    return container;
  }
}
