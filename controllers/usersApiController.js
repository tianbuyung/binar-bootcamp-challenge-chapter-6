const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;
const encrypt = require("bcryptjs");
const saltRounds = 10;
const UserService = require("../services/UserService");
const userService = new UserService();
// review di halaman sini kurang lebih sama kek yang di adminController
class UsersApiController {
  constructor() {}
  createUserGame(req, res) {
    // ini juga pastiin usernamenya belom ada sebelum create
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
  async getAllUsers(req, res, next) {
    const query = req.query;
    try {
      const payload = await userService.findAndCountAll(query);
      res.status(200).json({
        message: "Successfully read all users data",
        data: payload[0].rows,
        currentPage: payload[2],
        totalPages: Math.ceil(payload[0].count / payload[1]),
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
        code: 500,
        stack: err.stack,
      });
    }
  }
  getUserById(req, res) {
    UserGame.findOne({
      attributes: ["id", "username", "isAdmin", "createdAt", "updatedAt"],
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "bio",
          ],
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
