const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;
const encrypt = require("bcryptjs");
const saltRounds = 10;
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
  getAllUsers(req, res) {
    const query = req.query;
    let limit = Number(query.limit) || 5;
    let page = Number(query.page) || 1;
    let offset = (page - 1) * limit;
    UserGame.findAndCountAll({
      order: ["id"],
      limit: limit,
      offset,
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
    })
      .then((data) =>
        res.status(200).json({
          message: "Successfully read all users data",
          data,
          currentPage: page,
          totalPages: Math.ceil(data.count / limit),
        })
      )
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
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
