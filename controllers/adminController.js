const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;
const createError = require("http-errors");

class AdminController {
  constructor() {}
  getDashboardPage(req, res) {
    UserGame.findAll({
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "addres",
            "phoneNumber",
            "bio",
          ],
        },
      ],
    })
      .then((data) => {
        res.render("pages/admin/dashboard", {
          title: "Administrator",
          message: true,
          data,
        });
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  createUserGame(req, res, next) {
    const {
      username,
      password,
      firstName,
      lastName,
      addres,
      phoneNumber,
      bio,
      isAdmin,
    } = req.body;
    UserGame.create({
      username,
      password,
      isAdmin,
    })
      .then((data) => {
        UserGameBiodata.create({
          userId: data.id,
          firstName,
          lastName,
          addres,
          phoneNumber,
          bio,
        });
      })
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  viewUserById(req, res) {
    UserGame.findOne({
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "addres",
            "phoneNumber",
            "bio",
          ],
        },
      ],
      where: { id: req.params.id },
    })
      .then((data) => {
        res.render("pages/admin/viewProfile", { title: "View Profile", data });
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  getEditPage(req, res) {
    UserGame.findOne({
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "addres",
            "phoneNumber",
            "bio",
          ],
        },
      ],
      where: { id: req.params.id },
    })
      .then((data) => {
        res.render("pages/admin/editProfile", { title: "Edit Profile", data });
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  updateUserById(req, res) {
    console.log(req.body);
    const {
      username,
      password,
      firstName,
      lastName,
      addres,
      phoneNumber,
      bio,
      isAdmin,
    } = req.body;
    UserGame.update(
      {
        username,
        password,
        isAdmin,
        updatedAt: new Date().getTime(),
      },
      { where: { id: req.params.id } }
    )
      .then(() =>
        UserGameBiodata.update(
          {
            firstName,
            lastName,
            addres,
            phoneNumber,
            bio,
          },
          { where: { userId: req.params.id } }
        )
      )
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  deleteUserById(req, res) {
    UserGame.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
}

module.exports = AdminController;
