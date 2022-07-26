const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;
const encrypt = require("bcrypt");
const saltRounds = 10;

class UsersApiController {
  constructor() {}
  createUserGame(req, res) {
    UserGame.create({
      username: req.body.username,
      password: encrypt.hashSync(req.body.password, saltRounds),
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
  getAllUsers(req, res) {
    UserGame.findAll({
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: ["userId", "firstName", "lastName"],
        },
      ],
    })
      .then((data) =>
        res
          .status(200)
          .json({ message: "Successfully read all users data", data })
      )
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
  getUserById(req, res) {
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
      .then((data) =>
        res
          .status(200)
          .json({ message: "Successfully read detail a user", data })
      )
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
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
      .then(() =>
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

module.exports = UsersApiController;
