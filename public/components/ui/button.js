/**
 *
 * @param {Phaser.Scene} scene
 */
function getButton(scene, color = 1) {
  let container = scene.add.container(0, 0);
  container.setSize(100, 100);
  container.setInteractive();
  container.on("pointerdown", (_) => {
    console.log("clicked me");
  });
  let rectangle = scene.add.rectangle(0, 0, 100, 50, 0xffffff);
  let text = scene.add.text(0, 0, "Emma", {
    fontSize: 24,
    fontFamily: "aria",
    color: "black",
  });
  text.setOrigin(0.5, 0.5);
  container.add([rectangle, text]);
  //   Phaser.Display.Align.In.Center(rectangle, text)
  return container;
}
