'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Patients",
      [
        {
          name: "Ginevra Weasley",
          email: "gina@mail.com",
          phone: "999999999",
        },
        {
          name: "Lilian Evans",
          email: "lily@mail.com",
          phone: "999999999",
        },
        {
          name: "James Potter",
          email: "prongs@mail.com",
          phone: "999999999",
        },
        {
          name: "Sirius Black",
          email: "padfoot@mail.com",
          phone: "999999999",
        },
        {
          name: "Remus Lupin",
          email: "moony@mail.com",
          phone: "999999999",
        },
        {
          name: "Albus Dumbledore",
          email: "albus@mail.com",
          phone: "999999999",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Patients", null, {});
  }
};