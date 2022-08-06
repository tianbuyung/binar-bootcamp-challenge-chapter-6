const UserService = require("../services/UserService");
const userService = new UserService();

class UsersApiController {
  async createUserGame(req, res) {
    const payload = req.body;
    const [error, user] = await userService.userFindOrCreate(payload);
    if (error) {
      res.status(400).json({
        message: error,
      });
    } else {
      res.status(200).json({
        message: user,
      });
    }
  }
  async getAllUsers(req, res) {
    const query = req.query;
    const [users, limit, page] = await userService.usersFindAndCountAll(query);
    let error = users[0];
    if (error) {
      res.status(500).json({
        message: error,
      });
    } else {
      res.status(200).json({
        message: "Successfully read all users data",
        currentPage: page,
        totalPages: Math.ceil(users[1].count / limit),
        data: users[1].rows,
      });
    }
  }
  async getUserById(req, res) {
    const id = req.params.id;
    const [error, user] = await userService.userFindOne(id);
    if (error) {
      res.status(500).json({
        message: error,
      });
    } else {
      res.status(200).json({
        message: "Successfully read a detail user data",
        data: user,
      });
    }
  }
  async updateUserById(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const [error, user] = await userService.userUpdateData(id, payload);
    if (error) {
      res.status(400).json({
        message: error,
      });
    } else {
      res.status(200).json({
        message: user,
      });
    }
  }
  async deleteUserById(req, res) {
    const id = req.params.id;
    const [error, user] = await userService.userDeleteData(id);
    if (error) {
      res.status(400).json({
        message: error,
      });
    } else {
      res.status(200).json({
        message: user,
      });
    }
  }
}

module.exports = UsersApiController;
