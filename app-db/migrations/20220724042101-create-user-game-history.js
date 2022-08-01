"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_histories", {
      // ini mungkin perlu di kasih tau user pilih apa, dan computer pilih apa. Jadi kita jadi tau gak sekedar win lose situationnya doang
      // tapi tau kalo usernya milih A atau B atau C
      // Status update is Done
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      com_choice: {
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
