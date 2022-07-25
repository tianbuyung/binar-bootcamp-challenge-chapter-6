class IndexController {
  constructor() {}
  getHomePage(req, res) {
    res.render("pages/index", { title: "Traditional Games" });
  }
}

module.exports = IndexController;
