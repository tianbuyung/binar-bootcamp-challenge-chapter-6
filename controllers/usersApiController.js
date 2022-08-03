const UserService = require("../services/UserService");
const userService = new UserService();

class UsersApiController {
  async createUserGame(req, res) {
    try {
      const payload = req.body;
      const user = await userService.userFindOrCreate(payload);
      res.status(200).json({
        message: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        code: 400,
      });
    }
  }
  async getAllUsers(req, res) {
    try {
      const query = req.query;
      const users = await userService.usersFindAndCountAll(query);
      res.status(200).json({
        message: "Successfully read all users data",
        data: users[0].rows,
        currentPage: users[2],
        totalPages: Math.ceil(users[0].count / users[1]),
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        code: 500,
        stack: error.stack,
      });
    }
  }
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.userFindOne(id);
      res.status(200).json({
        message: "Successfully read all users data",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        code: 500,
        stack: error.stack,
      });
    }
  }
  async updateUserById(req, res) {
    try {
      const id = req.params.id;
      const payload = req.body;
      const user = await userService.userUpdateData(id, payload);
      res.status(200).json({
        message: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        code: 400,
      });
    }
  }
  async deleteUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.userDeleteData(id);
      res.status(200).json({
        message: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        code: 400,
      });
    }
  }
}

module.exports = UsersApiController;
