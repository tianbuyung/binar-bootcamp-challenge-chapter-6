"use strict";

const encrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user_games",
      [
        {
          id: uuidv4(),
          username: "babibu",
          password: encrypt.hashSync("123456", saltRounds),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          username: "cacicu",
          password: encrypt.hashSync("123456", saltRounds),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          username: "dadidu",
          password: encrypt.hashSync("123456", saltRounds),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          username: "fafifu",
          password: encrypt.hashSync("123456", saltRounds),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          username: "gagigu",
          password: encrypt.hashSync("123456", saltRounds),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(
      `SELECT id from user_games;`
    );
    const usersRows = users[0];
    return await queryInterface.bulkInsert(
      "user_game_biodata",
      [
        {
          id: 1,
          user_id: usersRows[0].id,
          first_name: "babibu",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: usersRows[1].id,
          first_name: "cacicu",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          user_id: usersRows[2].id,
          first_name: "dadidu",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          user_id: usersRows[3].id,
          first_name: "fafifu",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          user_id: usersRows[4].id,
          first_name: "gagigu",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user_game_biodata", null, {});
    return queryInterface.bulkDelete("user_games", null, {});
  },
};
