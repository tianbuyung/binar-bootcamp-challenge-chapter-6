const GameService = require("../services/GameService");
const gameService = new GameService();

class GameController {
  getGamePage(req, res) {
    const user = req.user.username;
    res.render("pages/user/game", {
      title: "Rock, Paper, Scissors Game",
      user,
    });
  }
  async storeGame(req, res) {
    try {
      const user = req.user.username;
      const payload = { ...req.body, user };
      const storeGame = await gameService.storeGameData(payload);
      console.log(storeGame);
      res.redirect("/game");
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
}

module.exports = GameController;
