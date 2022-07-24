class GameController {
  constructor() {}
  getGamePage(req, res) {
    res.render("pages/game", {
      title: "Rock, Paper, Scissors Game",
      gameStatus: false,
      message: "Unauthorized",
      messageClass: "alert-danger",
    });
  }
}

module.exports = GameController;
