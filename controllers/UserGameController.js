const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class UserGameController {
  constructor() {}
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
        res.json({ message: "Succesfully created new user" });
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
        res.json({ message: "Succesfully get all users data", data })
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
        res.json({ message: "Succesfully get all users data", data })
      )
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
}

module.exports = UserGameController;
