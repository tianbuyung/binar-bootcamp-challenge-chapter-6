const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class GameRepository {
  async storeGameData(payload) {
    try {
      let {
        userId,
        userScore,
        userFinalChoice,
        comScore,
        comFinalChoice,
        isWin,
      } = payload;
      let stored = await UserGameHistory.create({
        userId,
        userScore,
        userFinalChoice,
        comScore,
        comFinalChoice,
        isWin,
      });
      stored = "Your data has been stored!";
      return stored;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = GameRepository;
