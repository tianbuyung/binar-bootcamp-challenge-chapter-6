"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "user_games",
          key: "id",
          as: "userId",
        },
      },
      user_choice: {
        type: Sequelize.STRING,
      },
      user_score: {
        type: Sequelize.STRING,
      },
      com_choice: {
        type: Sequelize.STRING,
      },
      com_score: {
        type: Sequelize.STRING,
      },
      is_win: {
        type: Sequelize.STRING,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_game_histories");
  },
};
