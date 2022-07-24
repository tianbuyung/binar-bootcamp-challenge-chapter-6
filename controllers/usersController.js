const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class UsersController {
  constructor() {}
  getRegisterPage(req, res) {
    res.render("pages/register", { title: "Sign up", message: true });
  }
  getLoginPage(req, res) {
    res.render("pages/login", { title: "Sign in", message: true });
  }
  createNewUser(req, res) {
    let response = userModel.createNewUser(req.body);
    console.log(response);
    if (!response) {
      res.redirect("/users/login");
    } else {
      res.render("pages/register", {
        title: "Sign up",
        message: response,
        messageClass: "alert-danger",
      });
    }
  }
  loginUser(req, res, next) {
    let response = userModel.checkDataUser(req.body);
    if (response.length > 0) {
      res.render("pages/game", {
        title: "Rock, Paper, Scissors Game",
        gameStatus: true,
      });
    } else {
      res.render("pages/login", {
        title: "Sign in",
        message: "Invalid username or password",
        messageClass: "alert-danger",
      });
    }
  }
}

module.exports = UsersController;
