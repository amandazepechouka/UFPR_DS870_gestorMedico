const express = require("express");
const physiciansRouter = express.Router();
const physiciansController = require("../controllers/physiciansController");

physiciansRouter.get("/newPhysician", physiciansController.newPhysician);
physiciansRouter.get("/listAllPhysician", physiciansController.listAllPhysician);
physiciansRouter.get("/updatePhysician", physiciansController.updatePhysician);
physiciansRouter.get("/deletePhysician", physiciansController.deletePhysician);

physiciansRouter.post("/authenticationPhysician", physiciansController.authenticationPhysician);

module.exports = physiciansRouter;