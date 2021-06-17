const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentsController");

appointmentController.get("/newAppointment", appointmentController.newAppointment);
appointmentController.get("/searchAppointmentByPatientId", appointmentController.searchAppointmentByPatientId);
appointmentController.get("/searchAppointmentByPhysicianId", appointmentController.searchAppointmentByPhysicianId);
appointmentController.get("/deleteAppointment", appointmentController.deleteAppointment);

module.exports = appointmentRouter;