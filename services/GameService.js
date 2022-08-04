const UserRepository = require("../repositories/UserRepository");
const GameRepository = require("../repositories/GameRepository");

const userRepository = new UserRepository();
const gameRepository = new GameRepository();

class GameService {
  async storeGameData(payload) {
    try {
      const options = payload.username;
      let user = await userRepository.findOne(options);
      let userId = user.id;
      let newPayload = { ...payload, userId };
      const storeGameData = await gameRepository.storeGameData(newPayload);
      return storeGameData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = GameService;
