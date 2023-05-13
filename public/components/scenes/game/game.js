export default class GameScene extends Phaser.Scene {
  static KEY = "GAMESCENE";
  preload() {
    // Preload assets (if needed)
    this.load.image("bg", "assets/bg.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("tank", "assets/tank.png");
    this.tankGroups = this.add.group();
    this.bullets = this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });
  }

  create({ gameid }) {
    this.rotation = -Math.PI / 2;
    this.physics.world.setBoundsCollision();
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 400, "bg");
    // this.tank = this.add.image(400, 400, "tank");
    // this.tank2 = this.add.image(100, 100, "tank");

    let t1 = this.getTank("Leon");
    let t2 = this.getTank("Emma", 100, 60, "30");
    let t3 = this.getTank("Azza", 600, 60, "80");
    let ret = new Phaser.Geom.Rectangle(100, 60, 650, 450);
    Phaser.Actions.RandomRectangle([t1, t2, t3], ret);
  }

  getTank(name, x = 400, y = 400, id = "10") {
    const tankContainer = this.add.container();
    tankContainer.setSize(100, 100);
    tankContainer.setSize(50, 50);
    let tank = this.add.image(0, 0, "tank");
    const text = this.add.text(-40, -50, name);
    const width = text.width;
    const height = text.height;
    const white = this.add
      .rectangle(0, -50, 50, height, 0xffffff)
      .setOrigin(0, 0);
    const red = this.add
      .rectangle(0, -50, 40, height, 0xff1010)
      .setOrigin(0, 0);

    tank = this.physics.add.existing(tank, false);
    tank.setOrigin(0.7, 0.7);
    tank.body.setImmovable(true);
    let center = tank.getBounds();
    tank.body.setSize(40, 40);
    tank.id = id;
    tank.red = red;

    Phaser.Actions.AlignTo(
      [text, white],
      Phaser.Display.Align.RIGHT_CENTER,
      10
    );
    red.setPosition(white.x, white.y);
    tankContainer.add([tank, white, red, text]);
    tankContainer.setPosition(x, y);
    tankContainer.id = id;
    if (id == "10") this.tankContainer = tankContainer;
    // console.log("pos", tank.body.position, tank.x, tank.y);

    this.tankGroups.add(tankContainer);

    this.physics.add.collider(this.bullets, tank, (tank, bullet) => {
      if (tank.id == bullet.id) return;
      // bullet.destroy();
      console.log("overlap", tank.id, bullet.id);
      let red = tank.parentContainer.getAt(2);
      if (red.width <= 1) {
        tank.parentContainer.destroy();
        return;
      }
      red.setSize(red.width - 1, red.height);
      // console.log("width", tank.red.width);
      // window.red = tank.red.sets;
      // tank.red.displayWidth(red.width - 3);
    });
    return tankContainer;
  }

  update() {
    // Shoot the rectangle when the Z key is pressed
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      const bullet = this.bullets
        .get(this.tankContainer.x, this.tankContainer.y, "bullet")
        .setRotation(Math.PI / 2 + this.rotation)
        .setScale(0.3);
      bullet.body.setCollideWorldBounds(true);
      bullet.id = "10";
      bullet.body.onWorldBounds = true;
      bullet.body.world.on("worldbounds", (_bullet) => {
        if (_bullet.gameObject === bullet) {
          bullet.destroy();
          // console.log("destroyed");
        }
      });
      const speed = 300;
      const velocityX = Math.cos(this.rotation) * speed;
      const velocityY = Math.sin(this.rotation) * speed;
      bullet.setVelocityX(velocityX);
      bullet.setVelocityY(velocityY);
    }
    //rotate clockwise on akey
    if (this.aKey.isDown) {
      let offset = (Math.PI * 2) / 360;
      this.rotation += offset;
      this.tankContainer.rotation += offset;
    }
    //rotate counter clockwise on z key
    if (this.zKey.isDown) {
      let offset = (Math.PI * 2) / 360;
      this.rotation -= offset;
      this.tankContainer.rotation -= offset;
    }
    //Move up
    if (this.cursors.up.isDown) {
      let tank = this.tankContainer.first;
      console.log("position", tank.y, tank.body.y);
      let offset = 1;
      this.tankContainer.y -= offset;
    }
    //move down
    if (this.cursors.down.isDown) {
      let offset = 1;
      this.tankContainer.y += offset;
    }

    //Move left
    if (this.cursors.left.isDown) {
      let offset = 1;
      this.tankContainer.x -= offset;
    }
    //move right
    if (this.cursors.right.isDown) {
      let tank = this.tankContainer.first;
      console.log("position", tank.x, tank.body.x);
      let offset = 1;
      this.tankContainer.x += offset;
    }
  }
}
