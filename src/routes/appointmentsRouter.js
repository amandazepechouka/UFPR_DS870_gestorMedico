const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentsController");
const auth = require("../middlewares/auth");

appointmentController.post("/newAppointment", auth, appointmentController.newAppointment);
appointmentController.post("/searchAppointmentByPatientId/:patientId", auth, appointmentController.searchAppointmentByPatientId);
appointmentController.post("/searchAppointmentByPhysicianId/:physicianId", auth, appointmentController.searchAppointmentByPhysicianId);
appointmentController.post("/deleteAppointment", auth, appointmentController.deleteAppointment);

module.exports = appointmentRouter;