const Appointment = require("../models/Appointments");
const Patient = require("../models/Patients");
const Physician = require("../models/Physicians");

module.exports = {

    async newAppointment (req, res) {
        const { physicianId, patientId, appointmentDate, description} = req.body;
        if (!physicianId || !patientId || !appointmentDate || !description) {
            res
                .status(400)
                .json({
                    msg: "Dados obrigatórios não foram preenchidos."
                });
        }

        const isAppointmentNew = await Appointment.findOne({
            where: { appointmentDate},
        });
        
        if(isAppointmentNew) 
            res.status(403).json( { msg: "Consulta já foi cadastrado."});
        else {
            const appointment = await Appointment.create({
                physicianId,
                patientId,
                appointmentDate,
                description,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados."});
            });
            if (appointment)
                res.status(201).json({ msg: "Nova consulta foi adicionada."});
            else
                res.status(404).json({ msg: "Não foi possível cadastrar nova consulta." });
        }
    },

    async searchAppointmentByPatientId (req, res) {
        const patientId = req.params.patientId;
        if (!patientId)
            res.status(400).json({ msg: "Campo paciente vazio."});

        const appointments = await Appointment.findAll({
            where: { patientId },
        }).catch((error) => res.status(500).json({ msg: "Falha na conexão." }));
        if (appointments) {
            if (appointments == "")
                res.status(404).json({ msg: "Não há consultas para este paciente." });
            else 
                res.status(200).json({ appointments});
        }
        else
            res.status(404).json({ msg: "Não foi possível encontrar consultas." });
    },

    async searchAppointmentByPhysicianId (req, res) {
        const physicianId = req.params.physicianId;
        if (!physicianId)
            res.status(400).json({ msg: "Campo médico vazio."});

        const appointments = await Appointment.findAll({
            where: { physicianId },
        }).catch((error) => res.status(500).json({ msg: "Falha na conexão." }));
        if (appointments) {
            if (appointments == "")
                res.status(404).json({ msg: "Não há consultas para este médico." });
            else 
                res.status(200).json({ appointments});
        }
        else
            res.status(404).json({ msg: "Não foi possível encontrar consultas." });
    },
    
    async deleteAppointment (req, res) {
        const appointmentId = req.params.id;
        const deletedAppointment = await Appointment.destroy({
            where : { id: appointmentId},
        }).catch(async (error) => {
            const appointmentHasPhys =  await Physician.findOne({
                where: {physicianId},
            }).catch((error) => {
                res.status(500).json({ msg: "Falha de conexão."});
            });
            if (appointmentHasPhys)
                return res.status(403).json({ msg: "Consulta possui médico em seu nome." });

            const appointmentHasPatie =  await Patient.findOne({
                where: {patientId},
            }).catch((error) => {
                res.status(500).json({ msg: "Falha de conexão."});
            });
            if (appointmentHasPatie)
                return res.status(403).json({ msg: "Consulta possui paciente em seu nome." });    
        });
        if (deletedAppointment != 0)
            res.status(200).json({ msg: "Consulta excluida com sucesso."});
        else
            res.status(404).json({ msg: "Consulta não encontrada." });
    },
};