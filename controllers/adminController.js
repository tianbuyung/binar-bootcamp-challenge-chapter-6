const UserService = require("../services/UserService");
const userService = new UserService();

class AdminController {
  async getDashboardPage(req, res) {
    try {
      const query = req.query;
      const users = await userService.usersFindAndCountAll(query);
      res.render("pages/admin/dashboard", {
        title: "Administrator",
        message: true,
        users: users[0].rows,
        pages: Math.ceil(users[0].count / users[1]),
      });
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
  async createUserGame(req, res) {
    try {
      const payload = req.body;
      await userService.userFindOrCreate(payload);
      res.redirect("/admin");
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
  async viewUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.userFindOne(id);
      res.render("pages/admin/viewProfile", { title: "View Profile", user });
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
  async getEditPage(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.userFindOne(id);
      res.render("pages/admin/editProfile", { title: "View Profile", user });
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
  async updateUserById(req, res) {
    try {
      const id = req.params.id;
      const payload = req.body;
      await userService.userUpdateData(id, payload);
      res.redirect("/admin");
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
  async deleteUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.userDeleteData(id);
      res.redirect("/admin");
    } catch (error) {
      res.render("pages/error", {
        title: "Error",
        message: error.message,
        error: error,
      });
    }
  }
}

module.exports = AdminController;
