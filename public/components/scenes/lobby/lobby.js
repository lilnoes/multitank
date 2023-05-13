import { CLIENTCHATSENT } from "../../../../server/modules/lobby/clientchatsent.js";
import { LOBBYGAME } from "../../../../server/modules/lobby/lobbygame.js";
import { LOBBYINIT } from "../../../../server/modules/lobby/lobbyinit.js";
import { LOBBYUSER } from "../../../../server/modules/lobby/lobbyuser.js";
import { SERVERCHATSENT } from "../../../../server/modules/lobby/serverchatsent.js";
import { isSocketOpen } from "../../../client/client.js";
import { SCENECONFIG } from "../../../client/sceneconfig.js";
import { getButton } from "../../ui/button.js";
import OyunBeklemeScene from "../game/oyunbekleme.js";
import OyunKurScene from "../game/oyunkur.js";

export default class LobbyScene extends Phaser.Scene {
  /**
   * @type net.Socket
   */
  socket;
  constructor() {
    super(SCENECONFIG);
  }
  static KEY = "LobbyScene";
  preload() {
    this.plugins.get("rexawaitloaderplugin").addToScene(this);
    this.load.rexAwait(async (res, rej) => {
      this.socket = await isSocketOpen(this.registry.get("socket"));
      this.registry.set("socket", this.socket);

      // this.socket.on("data", (data) => {
      //   console.log("data", data.toString());
      // });
      res();
    });
    this.load.image("bg", "assets/bg1.png");
    this.load.html("chat", "assets/html/chat.html");
  }
  create() {
    this.socket.addListener("data", this.messageHandler);
    this.socket.addListener("data", this.userHandler);
    this.socket.addListener("data", this.gameHandler);

    this.events.on("shutdown", () => {
      this.socket.removeListener("data", this.messageHandler);
      this.socket.removeListener("data", this.userHandler);
      this.socket.removeListener("data", this.gameHandler);
    });
    // this.socket.addListener("data", (data) => {
    //   console.log(data.toString());
    // });
    let json = {
      ...LOBBYINIT.message,
      ID: this.registry.get("ID"),
      name: this.registry.get("name"),
    };
    this.socket.write(JSON.stringify(json));
    const bg = this.add.image(400, 400, "bg");
    this.bg1 = this.add.image(400, 400, "bg").setOrigin(0, 0);
    let dom1 = this.add.dom(30, 400).createFromCache("chat").setOrigin(0, 0);

    this.createChat();
    this.users = new Set();
    this.games = new Set();

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

    // dom1.setDepth(10);
    let sendButton = getButton(this, "Send", async () => {
      let textarea = document.getElementById("chat");
      let ID = this.registry.get("ID");
      if (textarea.value <= 0) return;
      let message = {
        ...CLIENTCHATSENT.message,
        name: this.registry.get("name"),
        message: textarea.value,
        ID,
      };
      let socket = await isSocketOpen(this.registry.get("socket"));
      socket.write(JSON.stringify(message));
      // this.events.emit("message", { name: "Leon", message: textarea.value });
      textarea.value = "";
    });

    Phaser.Actions.AlignTo(
      [dom1, sendButton],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
    this.messagesGroup = this.add.group();

    getButton(this, "Yeni oyun", () => {
      this.scene.start(OyunKurScene.KEY);
    }).setPosition(500, 300);

    this.cameras.main.setSize(1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.usersCamera = this.cameras.add(0, 0, 400, 400);
    this.gamesCamera = this.cameras.add(400, 0, 400, 400);
    this.chatCamera = this.cameras.add(0, 400, 400, 200);
    this.gamesCamera.setScroll(300, 0);
    this.chatCamera.setScroll(0, 400);
  }

  userHandler = (data) => {
    data = JSON.parse(data.toString());
    if (data.type != LOBBYUSER.message.type) return;
    if (this.usersGroup == null) {
      this.usersGroup = this.add.group();
      this.usersGroup.add(
        getButton(this, "Oyuncu Listesi", () => {}).setPosition(150, 60)
      );
    }

    let text = this.add.text(0, 0, data.name);
    let children = this.usersGroup.getChildren();
    let last = children[children.length - 1];
    this.usersGroup.add(text);
    Phaser.Actions.AlignTo(
      [last, text],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
  };

  gameHandler = (data) => {
    data = JSON.parse(data.toString());
    if (data.type != LOBBYGAME.message.type) return;
    if (this.gamesGroup == null) {
      this.gamesGroup = this.add.group();
      this.gamesGroup.add(
        getButton(this, "Oyun Listesi", () => {}).setPosition(500, 60)
      );
    }
    let text = this.add.text(0, 0, data.name);
    let button = getButton(this, "join", () => {
      this.scene.start(OyunBeklemeScene.KEY, {
        gameid: data.gameid,
        owner: false,
      });
    });
    let children = this.gamesGroup.getChildren();
    let last = children[children.length - 1];
    this.gamesGroup.add(button);

    Phaser.Actions.AlignTo(
      [last, button],
      Phaser.Display.Align.BOTTOM_LEFT,
      null,
      10
    );
    Phaser.Actions.AlignTo(
      [button, text],
      Phaser.Display.Align.RIGHT_CENTER,
      20,
      null
    );
  };

  update() {
    // if (this.cursors.down.isDown) {
    //   this.messagesCamera.scrollY += 5;
    // }

    this.bg1.x = this.messagesCamera.scrollX;
    this.bg1.y = this.messagesCamera.scrollY;
  }

  messageHandler = (data) => {
    console.log("mmmmme", data.toString());
    data = JSON.parse(data.toString());
    if (data.type != SERVERCHATSENT.message.type) return;

    let ID = this.registry.get("ID");

    let container = this.getMessageContainer(
      data.name,
      data.message,
      ID == data.ID ? true : false
    );
    let children = this.messagesGroup.getChildren();
    let x = 420;
    let y = 420;
    if (children.length > 0) {
      let last = children[children.length - 1];
      y = last.y + last.height + 10;
    }
    container.setPosition(x, y);
    if (container.y > 580 && this.messagesCamera.scrollY < container.y) {
      let diff = container.y - this.messagesCamera.scrollY - 200;
      this.messagesCamera.scrollY += diff + container.height + 10;
    }
    this.messagesGroup.add(container);
    // is;
  };

  createChat() {
    //create cameras
    this.messagesCamera = this.cameras.add(400, 400, 400, 200);
    this.messagesCamera.setScroll(400, 400);
    this.messagesGroup = this.add.group();
    //events creation
  }

  getMessageContainer(displayName, message, isSender) {
    let t1 = this.add
      .text(0, 0, displayName, {
        fontStyle: "bold",
        fontSize: 11,
        color: isSender ? "white" : "red",
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
