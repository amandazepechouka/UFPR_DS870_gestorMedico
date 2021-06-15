const express = require("express");
const patientsRouter = express.Router();
const patientsController = require("../controllers/patientsController");

patientsController.get("/newPhysician", patientsController.newPatient);
patientsController.get("/searchPatientByName", patientsController.searchPatientByName);
patientsController.get("/searchPatientByPhysicianId", patientsController.searchPatientByPhysicianId);
patientsController.get("/updatePatient", patientsController.updatePatient);

module.exports = patientsRouter;