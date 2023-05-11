const { log } = require("console");
const net = require("net");

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.setBaseURL("http://labs.phaser.io");
  this.load.image("logo", "assets/sprites/phaser3-logo.png");
}

function create() {
  let r = this.add.rectangle(100, 100, 100, 100, 0xff1010);
  r.setInteractive();
  r.on("pointerdown", () => {
    console.log("clicked me");

    const client = net.createConnection({ port: 8080 }, () => {
      console.log("Connected to server");
      client.write("Hello from client!\n");
    });

    client.on("data", (data) => {
      console.log(data.toString());
      client.end();
    });

    client.on("end", () => console.log("Disconnected from server"));
  });
  //   const logo = this.physics.add.image(400, 100, 'logo');
  //   logo.setVelocity(100, 200);
  //   logo.setBounce(1, 1);
  //   logo.setCollideWorldBounds(true);
}
