const UserService = require("../services/UserService");
const userService = new UserService();

class UsersController {
  getRegisterPage(req, res) {
    res.render("pages/user/register", { title: "Sign up", message: true });
  }
  getLoginPage(req, res) {
    res.render("pages/user/login", { title: "Sign in", message: true });
  }
  async createNewUser(req, res) {
    try {
      const payload = req.body;
      await userService.userRegister(payload);
      res.redirect("/users/login");
    } catch (error) {
      res.render("pages/user/register", {
        title: "Sign up",
        message: error.message,
        messageClass: "alert-danger",
      });
    }
  }
  async loginUser(req, res) {
    try {
      const session = req.session;
      const payload = req.body;
      const user = await userService.userLogin(session, payload);
      if (user) {
        res.redirect("/admin");
      } else {
        res.redirect("/game");
      }
    } catch (error) {
      res.render("pages/user/login", {
        title: "Sign in",
        message: error.message,
        messageClass: "alert-danger",
      });
    }
  }
  logoutUser(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = UsersController;
