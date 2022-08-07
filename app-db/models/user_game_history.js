"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserGameHistory.belongsTo(models.UserGame, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserGameHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "user_id",
      },
      userFinalChoice: {
        type: DataTypes.STRING,
        field: "user_choice",
      },
      userScore: {
        type: DataTypes.INTEGER,
        field: "user_score",
      },
      comFinalChoice: {
        type: DataTypes.STRING,
        field: "com_choice",
      },
      comScore: {
        type: DataTypes.INTEGER,
        field: "com_score",
      },
      isWin: { type: DataTypes.STRING, field: "is_win" },
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
      modelName: "UserGameHistory",
      tableName: "user_game_histories",
      paranoid: true,
    }
  );
  return UserGameHistory;
};
