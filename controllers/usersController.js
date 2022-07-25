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
    let err = null;
    const { username, password, confirmPassword, isAdmin } = req.body;
    console.log(isAdmin);
    if (password === confirmPassword) {
      UserGame.create({
        username: username,
        password: password,
        isAdmin: isAdmin,
      })
        .then((data) => {
          UserGameBiodata.create({
            userId: data.id,
          });
        })
        .then(() => {
          res.redirect("/users/login");
        })
        .catch((err) => {
          res.render("pages/register", {
            title: "Sign up",
            message: err.message,
            messageClass: "alert-danger",
          });
        });
    } else {
      err = "Password does not match.";
      res.render("pages/register", {
        title: "Sign up",
        message: err,
        messageClass: "alert-danger",
      });
    }
  }
  loginUser(req, res, next) {
    let err = null;
    let session = req.session;
    const { username, password } = req.body;
    if (!username || !password) {
      err = "Password/Username does not empty.";
      res.render("pages/login", {
        title: "Sign in",
        message: err,
        messageClass: "alert-danger",
      });
    }
    UserGame.findOne({
      where: { username },
    })
      .then((data) => {
        if (data.password === password) {
          if (data.isAdmin === true) {
            session.username = data.username;
            res.redirect("/admin");
          } else {
            session.username = data.username;
            res.redirect("/game");
          }
        } else {
          err = "Password does not match.";
          res.render("pages/login", {
            title: "Sign in",
            message: err,
            messageClass: "alert-danger",
          });
        }
      })
      .catch((err) => {
        res.render("pages/login", {
          title: "Sign in",
          message: err.message,
          messageClass: "alert-danger",
        });
      });
  }
  logoutUser(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = UsersController;
