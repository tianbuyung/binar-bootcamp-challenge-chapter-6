const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class UserRepository {
  async findAndCountAll(query) {
    try {
      let limit = Number(query.limit) || 5;
      let page = Number(query.page) || 1;
      let offset = (page - 1) * limit;
      let data = await UserGame.findAndCountAll({
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
      return [data, limit, page];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findOne(options) {
    try {
      let data = await UserGame.findOne({
        attributes: [
          "id",
          "username",
          "password",
          "isAdmin",
          "createdAt",
          "updatedAt",
        ],
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
        where: options,
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findOrCreate(payload) {
    try {
      let {
        username,
        password,
        isAdmin,
        firstName,
        lastName,
        address,
        phoneNumber,
        bio,
      } = payload;
      let data;
      let created;
      [data, created] = await UserGame.findOrCreate({
        where: {
          username,
          password,
          isAdmin,
        },
      });
      if (created) {
        await UserGameBiodata.create({
          userId: data.id,
          firstName,
          lastName,
          address,
          phoneNumber,
          bio,
        });
        created = "Your account has been created!";
        return created;
      }
    } catch (error) {
      throw new Error("The username is already exist!");
    }
  }
  async updateData(id, payload) {
    try {
      const {
        username,
        isAdmin,
        firstName,
        lastName,
        address,
        phoneNumber,
        bio,
      } = payload;
      await UserGame.update(
        {
          username,
          isAdmin,
          updatedAt: new Date().getTime(),
        },
        { where: { id: id } }
      );
      await UserGameBiodata.update(
        {
          firstName,
          lastName,
          address,
          phoneNumber,
          bio,
          updatedAt: new Date().getTime(),
        },
        { where: { userId: id } }
      );
      return "The data has been successfully updated";
    } catch (error) {
      throw new Error("The username is already exist!");
    }
  }
  async destroyData(id) {
    try {
      await UserGame.destroy({
        where: {
          id: id,
        },
      });
      await UserGameBiodata.destroy({
        where: {
          userId: id,
        },
      });
      return "The data has been successfully deleted";
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserRepository;
