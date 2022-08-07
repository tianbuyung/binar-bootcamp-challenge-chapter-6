const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class GameRepository {
  async storeGameData(payload) {
    let err = null;
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
      return [err, stored];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async getGameData(payload) {
    let result = [];
    let err = null;
    try {
      const sumUserScore = await UserGameHistory.sum("userScore", {
        where: { userId: payload },
      });
      const sumComScore = await UserGameHistory.sum("comScore", {
        where: { userId: payload },
      });
      result.push(sumUserScore, sumComScore);
      return [err, result];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
}

module.exports = GameRepository;
