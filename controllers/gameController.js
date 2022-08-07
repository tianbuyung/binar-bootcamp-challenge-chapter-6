const GameService = require("../services/GameService");
const UserService = require("../services/UserService");

const gameService = new GameService();
const userService = new UserService();

class GameController {
  async getGamePage(req, res) {
    let [err, user] = await userService.userFindOne(req.user.id);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      let [err, result] = await gameService.getGameData(req.user.id);
      let payload = { ...user, result };
      res.render("pages/user/game", {
        title: "Rock, Paper, Scissors Game",
        user: payload,
      });
    }
  }
  async storeGame(req, res) {
    const user = req.user.username;
    const payload = { ...req.body, user };
    const [err, storeGame] = await gameService.storeGameData(payload);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      console.log(storeGame);
      res.redirect("/game");
    }
  }
}

module.exports = GameController;
