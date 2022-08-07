const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

class UserRepository {
  async findAndCountAll(options) {
    let err = null;
    try {
      const data = await UserGame.findAndCountAll(options);
      return [err, data];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findOne(options) {
    let err = null;
    try {
      let data = await UserGame.findOne(options);
      if (data) {
        return [err, data];
      } else {
        err = "Data not found";
        return [err, null];
      }
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async findOrCreate(payload) {
    let err = null;
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
        return [err, created];
      }
    } catch (error) {
      err = "The username is already exist!";
      return [err, null];
    }
  }
  async updateData(id, payload) {
    let err = null;
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
      return [err, "The data has been successfully updated"];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
  async destroyData(id) {
    let err = null;
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
      return [err, "The data has been successfully deleted"];
    } catch (error) {
      err = error;
      return [err, null];
    }
  }
}

module.exports = UserRepository;
