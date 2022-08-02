const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class UserRepository {
  constructor() {}
  async findAndCountAll(query) {
    let users;
    try {
      let limit = Number(query.limit) || 5;
      let page = Number(query.page) || 1;
      let offset = (page - 1) * limit;
      users = await UserGame.findAndCountAll({
        order: ["id"],
        limit,
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
      });
      return [users, limit, page];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = UserRepository;
