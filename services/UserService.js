const UserRepository = require("../repositories/UserRepository");
const validator = require("validator");
const encrypt = require("bcryptjs");

const userRepository = new UserRepository();

class UserService {
  async usersFindAndCountAll(query) {
    try {
      const [users, limit, page] = await userRepository.findAndCountAll(query);
      return [users, limit, page];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async userFindOne(id) {
    try {
      const user = await userRepository.findOneById(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async userFindOrCreate(payload) {
    try {
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
        const user = await userRepository.findOrCreate(newPayload);
        return user;
      } else {
        throw new Error(
          "Password is weak, Password must contain minimum 1 letter, 1 number, 1 symbol, 1 lowercase, 1 uppercase and lenght more than 8 characters"
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async userUpdateData(id, payload) {
    try {
      const user = await userRepository.updateData(id, payload);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async userDeleteData(id) {
    try {
      const user = await userRepository.destroyData(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async userRegister(payload) {
    try {
      const { password, confirmPassword } = payload;
      if (password === confirmPassword) {
        try {
          await this.userFindOrCreate(payload);
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error("Password does not match");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async userLogin(session, payload) {
    try {
      const { username, password } = payload;
      if (!username || !password) {
        throw new Error("Password/Username does not empty");
      }
      const user = await userRepository.findOneByUsername(username);
      const isTruePassword = await encrypt.compare(password, user.password);
      if (isTruePassword) {
        if (user.isAdmin) {
          session.username = user.username;
          return true;
        } else {
          session.username = user.username;
          return false;
        }
      } else {
        throw new Error("Password does not match");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
