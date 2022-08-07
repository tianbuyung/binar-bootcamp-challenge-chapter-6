const UserRepository = require("../repositories/UserRepository");
const GameRepository = require("../repositories/GameRepository");

const userRepository = new UserRepository();
const gameRepository = new GameRepository();

class GameService {
  async storeGameData(payload) {
    const options = {
      attributes: ["id"],
      where: { username: payload.user },
    };
    let [err, user] = await userRepository.findOne(options);
    if (err) {
      return [err, null];
    }
    let userId = user.id;
    let newPayload = { ...payload, userId };
    return await gameRepository.storeGameData(newPayload);
  }
  async getGameData(payload) {
    return await gameRepository.getGameData(payload);
  }
}

module.exports = GameService;
