/**
 *
 * @param {Phaser.Scene} scene
 */
export function getButton(scene, text = "Button", onClick = null, color = 1) {
  let container = scene.add.container(0, 0);
  container.setSize(100, 50);
  container.setInteractive();
  container.on("pointerdown", onClick);
  let rectangle = scene.add.rectangle(0, 0, 100, 50, 0xffffff);
  let textLabel = scene.add.text(0, 0, text, {
    fontSize: 24,
    fontFamily: "aria",
    color: "black",
  });
  textLabel.setOrigin(0.5, 0.5);
  container.add([rectangle, textLabel]);
  //   Phaser.Display.Align.In.Center(rectangle, text)
  return container;
}
