class GameController {
  constructor() {}
  getGamePage(req, res) {
    res.render("pages/game", {
      title: "Rock, Paper, Scissors Game",
    });
  }
}

module.exports = GameController;
