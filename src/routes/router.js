const express = require("express");
const appointmentRouter = require("./appointmentsRouter");
const patientsRouter = require("./patientsRouter");
const physiciansRouter = require("./physiciansRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("It's working");
});

router.use("/appointments", appointmentRouter);
router.use("/patients", patientsRouter);
router.use("/physicians", physiciansRouter);

module.exports = router;