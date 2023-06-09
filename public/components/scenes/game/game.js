import { GAMEBULLET } from "../../../../server/modules/playing/gamebullet.js";
import { GAMEEND } from "../../../../server/modules/playing/gameend.js";
import { GAMESTART } from "../../../../server/modules/playing/gamestart.js";
import { GAMEUPDATE } from "../../../../server/modules/playing/gameupdate.js";
import { GAMEUSERINFO } from "../../../../server/modules/playing/gameuserinfo.js";
import { sendMessage } from "../../../client/client.js";
import { getSocketID } from "../../../client/utils.js";
import OyunSonuScene from "./oyunson.js";

export default class GameScene extends Phaser.Scene {
  static KEY = "GAMESCENE";
  preload() {
    // Preload assets (if needed)

    this.load.image("bg", "assets/bg.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("tank", "assets/tank.png");
    this.tanksGroup = this.add.group();
    this.bullets = this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });
  }

  handleGameStart = (data) => {
    console.log("staring", data);
    this.gameid = data.gameid;
    this.speed = data.speed;
    // if (data.type != GAMESTART.message.type) return;
    for (let user of data.users) this.tanksGroup.add(this.getTank(user));
    this.scene.setVisible(true);
  };

  create({ gameid }) {
    this.gameid = gameid;
    console.log("created scene", gameid);
    [this.socket, this.ID] = getSocketID(this);
    this.socket.onAny((event, msg) => {
      console.log("from game", event, msg);
    });
    this.game.events.on(GAMESTART.message.type, this.handleGameStart);
    this.game.events.on(GAMEUPDATE.message.type, this.handleGameUpdate);
    this.game.events.on(GAMEBULLET.message.type, this.handleBulletUpdate);
    this.game.events.on(GAMEEND.message.type, this.handleGameEnd);

    this.events.on("shutdown", () => {
      console.log("created scene shutoff");
      this.game.events.off(GAMESTART.message.type, this.handleGameUpdate);
      this.game.events.off(GAMEBULLET.message.type, this.handleBulletUpdate);
      this.game.events.off(GAMEEND.message.type, this.handleGameEnd);
    });

    this.physics.world.setBoundsCollision();
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 400, "bg");
  }

  getTank(user) {
    const tankContainer = this.add.container();
    tankContainer.setSize(50, 50);
    const tank = this.add.image(0, 0, "tank");
    const text = this.add.text(-40, -50, user.name);
    const score = this.add.text(-40, -50, "0");
    const height = text.height;
    const white = this.add
      .rectangle(0, -50, 50, height, 0xffffff)
      .setOrigin(0, 0);
    const red = this.add
      .rectangle(0, -50, 50, height, 0xff1010)
      .setOrigin(0, 0);

    this.physics.add.existing(tank, false);
    tank.setOrigin(0.7, 0.7);
    tank.body.setImmovable(true);
    tank.body.setSize(40, 40);
    tank.ID = user.ID;

    Phaser.Actions.AlignTo([tank, text], Phaser.Display.Align.TOP_LEFT, 1);
    Phaser.Actions.AlignTo(
      [text, white],
      Phaser.Display.Align.RIGHT_CENTER,
      10
    );
    Phaser.Actions.AlignTo(
      [white, score],
      Phaser.Display.Align.RIGHT_CENTER,
      10
    );
    red.setPosition(white.x, white.y);
    tankContainer.add([tank, white, red, text, score]);
    tankContainer.ID = user.ID;
    if (user.ID == this.ID) this.tankContainer = tankContainer;

    tankContainer.setPosition(user.x, user.y);
    tankContainer.setAngle(user.angle);

    this.physics.add.collider(this.bullets, tank, (tank, bullet) => {
      let newscore = "";
      let life = 100;
      if (tank.ID == bullet.ID) return;
      // console.log("overlap", tank.id, bullet.id);
      let red = tank.parentContainer.getAt(2);

      try {
        let score = this.tanksGroup.getMatching("ID", bullet.ID)[0].getAt(4);
        newscore = parseInt(score.text) + 10;
        score.text = newscore.toString();
      } catch (e) {
        console.log("error updating score", e);
      }

      if (red.width < 1) {
        tank.parentContainer.destroy();
        return;
      }
      life = red.width - 1;
      red.setSize(life, red.height);
      bullet.destroy();

      if (tank.ID == this.ID || bullet.ID == this.ID) this.sendGameUserInfo();

      // console.log("width", tank.red.width);
      // window.red = tank.red.sets;
      // tank.red.displayWidth(red.width - 3);
    });
    return tankContainer;
  }

  handleGameEnd = (data) => {
    console.log("game ended", data);
    this.scene.start(OyunSonuScene.KEY, data);
  };

  handleGameUpdate = (data) => {
    try {
      let container = this.tanksGroup.getMatching("ID", data.ID)[0];
      container.x = data.x;
      container.y = data.y;
      container.getAt(0).angle = data.angle;
    } catch (e) {
      console.log("not found", e);
    }
  };

  handleBulletUpdate = (data) => {
    try {
      // console.log("received", data);
      this.getBullet(data.rotation, data.x, data.y, data.ID, data.vx, data.vy);
      // container.x = data.x;
    } catch (e) {
      console.log("not found", e);
    }
  };

  sendGameUserInfo() {
    const name = this.registry.get("name");
    let red = this.tankContainer.getAt(2);
    let score = this.tankContainer.getAt(4);
    let message = {
      ...GAMEUSERINFO.message,
      ID: this.ID,
      gameid: this.gameid,
      life: (red.width / 50) * 100,
      score: parseInt(score.text),
      name,
    };
    sendMessage(this.socket, message);
  }

  sendUpdate(life = 100, score = 0) {
    const { x, y } = this.tankContainer;
    const angle = this.tankContainer.getAt(0).angle;
    let message = {
      ...GAMEUPDATE.message,
      ID: this.ID,
      gameid: this.gameid,
      x,
      y,
      angle,
      life,
      score,
    };
    sendMessage(this.socket, message);
  }

  update() {
    // Shoot the rectangle when the Z key is pressed
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      const offset = -Math.PI / 2;
      const rotation = this.tankContainer.getAt(0).rotation;
      const speed = this.speed;
      const velocityX = Math.cos(rotation + offset) * speed;
      const velocityY = Math.sin(rotation + offset) * speed;
      // bullet.setVelocityX(velocityX);
      // bullet.setVelocityY(velocityY);
      this.getBullet(
        rotation,
        this.tankContainer.x,
        this.tankContainer.y,
        this.ID,
        velocityX,
        velocityY
      );
    }
    //rotate clockwise on akey
    if (this.aKey.isDown) {
      let offset = (Math.PI * 2) / 360;
      this.rotation += offset;
      this.tankContainer.getAt(0).rotation += offset;
      this.sendUpdate();
    }
    //rotate counter clockwise on z key
    if (this.zKey.isDown) {
      let offset = (Math.PI * 2) / 360;
      this.rotation -= offset;
      this.tankContainer.getAt(0).rotation -= offset;
      this.sendUpdate();
    }
    //Move up
    if (this.cursors.up.isDown) {
      let tank = this.tankContainer.first;
      let offset = 1;
      this.tankContainer.y -= offset;
      this.sendUpdate();
    }
    //move down
    if (this.cursors.down.isDown) {
      let offset = 1;
      this.tankContainer.y += offset;
      this.sendUpdate();
    }

    //Move left
    if (this.cursors.left.isDown) {
      let offset = 1;
      this.tankContainer.x -= offset;
      this.sendUpdate();
    }
    //move right
    if (this.cursors.right.isDown) {
      let tank = this.tankContainer.first;
      let offset = 1;
      this.tankContainer.x += offset;
      this.sendUpdate();
    }
  }
  getBullet(rotation, x, y, ID, vx, vy) {
    const bullet = this.bullets
      .get(x, y, "bullet")
      .setRotation(rotation)
      .setScale(0.3);
    bullet.body.setCollideWorldBounds(true);
    bullet.ID = ID;
    bullet.body.onWorldBounds = true;
    bullet.body.world.on("worldbounds", (_bullet) => {
      if (_bullet.gameObject === bullet) {
        bullet.destroy();
        console.log("destroyed");
      }
    });
    bullet.setVelocityX(vx);
    bullet.setVelocityY(vy);
    if (ID != this.ID) return bullet;
    let message = {
      ...GAMEBULLET.message,
      gameid: this.gameid,
      ID,
      x,
      y,
      vx,
      vy,
      rotation,
    };
    sendMessage(this.socket, message);
    return bullet;
  }
}
