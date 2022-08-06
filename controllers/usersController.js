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
    const payload = req.body;
    const [err, user] = await userService.userRegister(payload);
    if (err) {
      res.render("pages/user/register", {
        title: "Sign up",
        message: err,
        messageClass: "alert-danger",
      });
    } else {
      res.redirect("/users/login");
    }
  }
  async loginUser(req, res) {
    const session = req.session;
    const payload = req.body;
    const [err, user] = await userService.userLogin(session, payload);
    if (err) {
      res.render("pages/user/login", {
        title: "Sign in",
        message: err,
        messageClass: "alert-danger",
      });
    } else {
      res.cookie("token", user);
      res.redirect("/admin");
    }
  }
  logoutUser(req, res) {
    req.session.destroy();
    res.clearCookie("token");
    res.redirect("/");
  }
}

module.exports = UsersController;
