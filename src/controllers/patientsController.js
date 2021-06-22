const Patient = require("../models/Physicians");
const Physician = require("../models/Physicians");
const Sequelize = require("sequelize");

module.exports = {

    async newPatient(req, res) {
        const { name, email, phone} = req.body;
        if (!name || !email || !phone) {
            res
                .status(400)
                .json({
                    msg: "Dados obrigatórios não foram preenchidos."
                });
        }

        const isPatientNew = await Patient.findOne({
            where: { email},
        });

        if(isPatientNew) 
            res.status(403).json( { msg: "Paciente já foi cadastrado."});
        else {
            const patient = await Patient.create({
                name,
                email,
                phone,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados."});
            });
            if (patient)
                res.status(201).json({ msg: "Novo paciente foi adicionado."});
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo paciente." });
        }
    },
    
    async searchPatientByName(req, res) {
        const name = req.body.name;
        if(!name)
            res.status(400).json({ msg: "Parâmentro nome está vazio." });
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: { name: { [Op.like]: "%" + name + "%" } }, 
        });
        if (patient) {
            if (patient == "")
                res.status(404).json({ msg: "Paciente não encontrado." });
            else
                res.status(200).json({ patient });
        }
        else 
            res.status(404).json({ msg: "Pacinete não encontrado." });
    },

    async searchPatientByPhysicianId(req, res) {
        const id = req.body.id;
        if(!id)
            res.status(400).json({ msg: "Parâmentro nome está vazio." });
        const physician = await Physician.findAll({
            where: { id: physicianId},
        });
        console.log(physician);
        if (physician) {
            if (physician == "")
                res.status(200).json({ msg: "Médico não encontrado."});
            else 
                res.status(200).json({ physician });
        }
        else
            res.status(404).json({ msg: "Médico não encontrado." });
    },

    async updatePatient(req, res) {
        const patientnId = req.body.id;
        const patient = req.body;
        if (!patientnId)
            res.status(400).json( { msg: "ID do paciente vazio." });
        else {
            const patientExists = await Patient.findByPk(patientnId);
            if (!patientExists)
                res.status(404).json({ msg: "Paciente não encontrado." });
            else {
                if (patient.name || patient.phone) {
                    await Patient.update(patient, {
                        where: { id: patientnId },
                    });
                    return res.status(200).json({ msg: "Paciente atualizado com sucesso." });
                }
                else return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

};