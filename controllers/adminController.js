class AdminController {
  constructor() {}
  getDashboardPage(req, res) {
    res.render("pages/admin", { title: "Administrator" });
  }
}

module.exports = AdminController;
