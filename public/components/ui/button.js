/**
 *
 * @param {Phaser.Scene} scene
 */
export function getButton(scene, text = "Button", onClick = null, color = 1) {
  let container = scene.add.container(0, 0);
  container.on("pointerdown", onClick);
  let textLabel = scene.add.text(0, 0, text, {
    fontSize: 24,
    fontFamily: "aria",
    color: "black",
  });
  let rectangle = scene.add.rectangle(
    0,
    0,
    Phaser.Math.Snap.Ceil(textLabel.width, 20),
    Phaser.Math.Snap.Ceil(textLabel.height, 20),
    0xffffff
  );
  container.setSize(rectangle.width, rectangle.height);
  container.setInteractive();
  textLabel.setOrigin(0.5, 0.5);
  container.add([rectangle, textLabel]);
  //   Phaser.Display.Align.In.Center(rectangle, text)
  return container;
}
