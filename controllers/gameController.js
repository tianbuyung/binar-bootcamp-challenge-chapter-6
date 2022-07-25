class GameController {
  constructor() {}
  getGamePage(req, res) {
    res.render("pages/user/game", {
      title: "Rock, Paper, Scissors Game",
    });
  }
}

module.exports = GameController;
