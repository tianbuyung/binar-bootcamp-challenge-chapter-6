const UserService = require("../services/UserService");
const userService = new UserService();

class AdminController {
  async getDashboardPage(req, res) {
    const query = req.query;
    const [users, limit, page] = await userService.usersFindAndCountAll(query);
    let error = users[0];
    if (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    } else {
      res.render("pages/admin/dashboard", {
        title: "Administrator",
        message: true,
        users: users[1].rows,
        pages: Math.ceil(users[1].count / limit),
      });
    }
  }
  async createUserGame(req, res) {
    const payload = req.body;
    const [err, users] = await userService.userFindOrCreate(payload);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      res.redirect("/admin");
    }
  }
  async viewUserById(req, res) {
    const id = req.params.id;
    const [err, user] = await userService.userFindOne(id);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      res.render("pages/admin/viewProfile", { title: "View Profile", user });
    }
  }
  async getEditPage(req, res) {
    const id = req.params.id;
    const [err, user] = await userService.userFindOne(id);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      res.render("pages/admin/editProfile", { title: "Edit Profile", user });
    }
  }
  async updateUserById(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const [err, user] = await userService.userUpdateData(id, payload);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      res.redirect("/admin");
    }
  }
  async deleteUserById(req, res) {
    const id = req.params.id;
    const [err, user] = await userService.userDeleteData(id);
    if (err) {
      res.render("pages/error", {
        title: "Error",
        message: err,
        error: err,
      });
    } else {
      res.redirect("/admin");
    }
  }
}

module.exports = AdminController;
