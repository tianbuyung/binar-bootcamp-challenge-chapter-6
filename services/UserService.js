const validator = require("validator");
const encrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/UserRepository");
const Model = require("../app-db/models");

const userRepository = new UserRepository();
const { UserGame, UserGameBiodata, UserGameHistory } = Model;

const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";

class UserService {
  async usersFindAndCountAll(query) {
    const limit = Number(query.limit) || 5;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    const options = {
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
    };
    const users = await userRepository.findAndCountAll(options);
    return [users, limit, page];
  }
  async userFindOne(id) {
    const options = {
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
      where: { id: id },
    };
    return await userRepository.findOne(options);
  }
  async userFindOrCreate(payload) {
    let { password } = payload;
    let isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    });
    if (isStrongPassword) {
      const salt = await encrypt.genSalt(10);
      password = await encrypt.hash(password, salt);
      let newPayload = { ...payload, password };
      return await userRepository.findOrCreate(newPayload);
    } else {
      let err =
        "Password is weak, Password must contain minimum 1 letter, 1 number, 1 symbol, 1 lowercase, 1 uppercase and lenght more than 8 characters";
      return [err, null];
    }
  }
  async userUpdateData(id, payload) {
    return await userRepository.updateData(id, payload);
  }
  async userDeleteData(id) {
    return await userRepository.destroyData(id);
  }
  async userRegister(payload) {
    let err = null;
    const { username, password, confirmPassword } = payload;
    if (!username || !password) {
      err = "Password/Username does not empty";
      return [err, null];
    }
    if (password === confirmPassword) {
      return await this.userFindOrCreate(payload);
    } else {
      err = "Password does not match";
      return [err, null];
    }
  }
  async userLogin(session, payload) {
    let err = null;
    const { username, password } = payload;
    if (!username || !password) {
      err = "Password/Username does not empty";
      return [err, null];
    }
    const options = {
      attributes: ["id", "username", "password", "isAdmin"],
      where: { username: username },
    };
    let [error, isUserFound] = await userRepository.findOne(options);
    if (error) {
      return [error, null];
    }
    if (isUserFound) {
      const isTruePassword = await encrypt.compare(
        password,
        isUserFound.password
      );
      if (isTruePassword) {
        try {
          let token = jwt.sign(
            {
              id: isUserFound.id,
              username: isUserFound.username,
              isAdmin: isUserFound.isAdmin,
            },
            secretKey,
            { expiresIn: 60 * 60 }
          );
          return [err, token];
        } catch (error) {
          return [error, null];
        }
      } else {
        err = "Password does not match";
        return [err, null];
      }
    } else {
      err = "User is not found";
      return [err, null];
    }
  }
}

module.exports = UserService;
