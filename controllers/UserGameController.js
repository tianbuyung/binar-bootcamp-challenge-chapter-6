const Model = require("../app-db/models");
const { UserGame } = Model;

class UserGameController {
  constructor() {}
  createUserGame(req, res) {
    UserGame.create({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    })
      .then(() => res.json({ message: "Succesfully created new user" }))
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
  getAllUsers(req, res) {
    UserGame.findAll()
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
