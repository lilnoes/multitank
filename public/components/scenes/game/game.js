export default class GameScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.x = 400;
    this.y = 400;
    this.rotation = -Math.PI / 2;
  }

  preload() {
    // Preload assets (if needed)
    this.load.image("bg", "assets/bg.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("tank", "assets/tank.png");
  }

  create() {
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 400, "bg");
    this.tank = this.add.image(400, 400, "tank");
    this.tank2 = this.add.image(100, 100, "tank");
    // Add the rectangle at the desired location

    // Add Z key input listener
    this.physics.add.existing(this.tank2, true);
    this.tank2.body.setSize(20, 20);
    this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });
    this.physics.add.collider(this.bullets, this.tank2);
  }

  update() {
    // Shoot the rectangle when the Z key is pressed
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      let bullet = this.bullets
        .get(this.tank.x, this.tank.y, "bullet")
        .setRotation(Math.PI / 2 + this.rotation)
        .setScale(0.3);
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
      this.tank.rotation += offset;
    }
    //rotate counter clockwise on z key
    if (this.zKey.isDown) {
      let offset = (Math.PI * 2) / 360;
      this.rotation -= offset;
      this.tank.rotation -= offset;
    }
    //Move up
    if (this.cursors.up.isDown) {
      let offset = 1;
      this.tank.y -= offset;
    }
    //move down
    if (this.cursors.down.isDown) {
      let offset = 1;
      this.tank.y += offset;
    }

    //Move left
    if (this.cursors.left.isDown) {
      let offset = 1;
      this.tank.x -= offset;
    }
    //move right
    if (this.cursors.right.isDown) {
      let offset = 1;
      this.tank.x += offset;
    }
  }
}
