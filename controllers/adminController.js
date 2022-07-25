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
          ],
        },
      ],
    })
      .then((data) => {
        res.render("pages/admin", { title: "Administrator", data });
      })
      .catch((err) => {
        createError(err.code);
      });
  }
  createUserGame(req, res) {
    UserGame.create({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    })
      .then((data) => {
        UserGameBiodata.create({
          userId: data.id,
        });
      })
      .then(() => {
        res.status(200).json({ message: "Successfully created new user" });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
  viewUserById(req, res) {
    UserGame.findOne({
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: ["userId", "firstName", "lastName"],
        },
      ],
      where: { id: req.params.id },
    })
      .then((data) => {
        res.render("pages/viewProfile", { title: "View Profile", data });
      })
      .catch((err) => {
        createError(err.code);
      });
  }
  updateUserById(req, res) {
    UserGame.update(
      {
        username: req.body.username,
        isAdmin: req.body.isAdmin,
        updatedAt: new Date().getTime(),
      },
      { where: { id: req.params.id } }
    )
      .then((data) =>
        res.status(200).json({ message: "Successfully updated user data" })
      )
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
  deleteUserById(req, res) {
    UserGame.destroy({ where: { id: req.params.id } })
      .then(() =>
        res.status(200).json({ message: "Successfully deleted user data" })
      )
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
}

module.exports = AdminController;
