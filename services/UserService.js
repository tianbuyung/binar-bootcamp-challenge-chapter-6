const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository();

class UserService {
  constructor() {}
  async findAndCountAll(query) {
    try {
      const [users, limit, page] = await userRepository.findAndCountAll(query);
      return [users, limit, page];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = UserService;
