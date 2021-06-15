const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Physicians = require("../database/models/Physicians");
const Patients = require("../database/models/Patients");
const Appointments = require("../database/models/Appointments");

const connection = new Sequelize(dbConfig);

Physicians.init(connection);
Patients.init(connection);
Appointments.init(connection);

Physicians.associate(connection.models);
Patients.associate(connection.models);
Appointments.associate(connection.models);

module.exports = connection;
