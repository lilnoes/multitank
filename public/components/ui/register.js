class RegisterScene extends Phaser.Scene {
  preload() {
    this.load.html("login", "assets/html/login.html");
  }
  create() {
    let dom1 = this.add.dom(400, 400).createFromCache("login");
    let button = getButton(this);

    Phaser.Actions.AlignTo(
      [dom1, button],
      Phaser.Display.Align.BOTTOM_CENTER,
      null,
      10
    );
  }
}

function getLogin() {
  return "<div>Login</div>";
}
