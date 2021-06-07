'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "Harry Potter",
          email: "hp@mail.com",
          password: "31071980",
        },
        {
          name: "Hermione Granger",
          email: "hermione@mail.com",
          password: "19091979",
        },
        {
          name: "Ronald Weasley",
          email: "rony@mail.com",
          password: "01031980",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Physicians", null, {});
  }
};
