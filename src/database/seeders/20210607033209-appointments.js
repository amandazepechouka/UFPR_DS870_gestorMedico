"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Appointments",
			[
				{
					physicianId: 1,
          patientId: 1,
					appointmentDate: "2021-06-07",
					description: "Consulta de Rotinalo 1",
				},
				{
					physicianId: 1,
          patientId: 4,
					appointmentDate: "2021-05-31",
					description: "Consulta de Rotinao 2",
				},
				{
					physicianId: 2,
          patientId: 2,
					appointmentDate: "2021-06-07",
					description: "Consulta de Rotina",
				},
				{
					physicianId: 2,
          patientId: 5,
					appointmentDate: "2021-06-14",
					description: "Consulta de Rotina",
				},
        {
					physicianId: 3,
          patientId: 3,
					appointmentDate: "2021-06-30",
					description: "Consulta de Rotina",
				},
				{
					physicianId: 3,
          patientId: 2,
					appointmentDate: "2021-05-01",
					description: "Consulta de Rotina",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Appointments", null, {});
	},
};