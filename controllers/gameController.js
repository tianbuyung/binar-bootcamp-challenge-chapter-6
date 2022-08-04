const GameService = require("../services/GameService");
const gameService = new GameService();

class GameController {
  getGamePage(req, res) {
    const user = req.session.username;
    res.render("pages/user/game", {
      title: "Rock, Paper, Scissors Game",
      user,
    });
  }
  async storeGame(req, res) {
    try {
      const user = req.session.username;
      const payload = { ...req.body, user };
      const storeGame = await gameService.storeGameData(payload);
      console.log(storeGame);
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
