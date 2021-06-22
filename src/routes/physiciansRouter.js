const express = require("express");
const physiciansRouter = express.Router();
const physiciansController = require("../controllers/physiciansController");
const auth = require("../middlewares/auth");

physiciansRouter.post("/newPhysician", auth, physiciansController.newPhysician);
physiciansRouter.get("/listAllPhysician", auth, physiciansController.listAllPhysician);
physiciansRouter.put("/updatePhysician", auth, physiciansController.updatePhysician);
physiciansRouter.post("/deletePhysician:/id", auth, physiciansController.deletePhysician);

physiciansRouter.post("/authenticationPhysician", physiciansController.authenticationPhysician);

module.exports = physiciansRouter;