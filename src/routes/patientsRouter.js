const express = require("express");
const patientsRouter = express.Router();
const patientsController = require("../controllers/patientsController");

patientsController.post("/newPhysician", patientsController.newPatient);
patientsController.post("/searchPatientByName", patientsController.searchPatientByName);
patientsController.post("/searchPatientByPhysicianId/:id", patientsController.searchPatientByPhysicianId);
patientsController.put("/updatePatient", patientsController.updatePatient);

module.exports = patientsRouter;