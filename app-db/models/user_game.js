"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserGame.hasOne(models.UserGameBiodata, {
        foreignKey: "user_id",
        as: "biodata",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.UserGame.hasMany(models.UserGameHistory, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserGame.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [8, 128],
        },
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: "is_admin",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        field: "is_deleted",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().getTime(),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().getTime(),
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "UserGame",
      tableName: "user_games",
      paranoid: true,
    }
  );
  return UserGame;
};
