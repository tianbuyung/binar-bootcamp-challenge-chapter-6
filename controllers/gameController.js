class GameController {
  getGamePage(req, res) {
    const user = req.session.username;
    res.render("pages/user/game", {
      title: "Rock, Paper, Scissors Game",
      user,
    });
  }
}

module.exports = GameController;
