const Physician = require("../models/Physicians");
const Appointment = require("../models/Appointments");
module.exports = {

    async newPhysician(req, res) {
        const { name, email, password} = req.body;
        if (!name || !email || !password) {
            res
                .status(400)
                .json({
                    msg: "Dados obrigatórios não foram preenchidos."
                });
        }

        const isPhysicianNew = await Physician.findOne({
            where: { email},
        });
        
        if(isPhysicianNew) 
            res.status(403).json( { msg: "Médico já foi cadastrado."});
        else {
            const physician = await Physician.create({
                name,
                email,
                password,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados."});
            });
            if (physician)
                res.status(201).json({ msg: "Novo médico foi adicionado."});
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo médico." });
        }
    },

    async listAllPhysician(req, res) {
        const physicians = await Physician.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha de conexão."});
        });
        if (physicians) res.status(200).json({ physicians});
        else
            res.status(404).json({ msg: "Não foi possivel encontrar médicos."});
    },

    async updatePhysician(req, res) {
        const physicianId = req.body.id;
        const physician = req.body;
        if (!physicianId)
            res.status(400).json( { msg: "ID do médico vazio." });
        else {
            const physicianExists = await Physician.findByPk(physicianId);
            if (!physicianExists)
                res.status(404).json({ msg: "Médico não encontrado." });
            else {
                if (physician.name || physician.email) {
                    await Physician.update(physician, {
                        where: { id: physicianId },
                    });
                    return res.status(200).json({ msg: "Médico atualizado com sucesso." });
                }
                else return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    async deletePhysician(req, res) {
        const physicianId = req.params.id;
        const deletedPhysician = await Physician.destroy({
            where : { id: physicianId},
        }).catch(async (error) => {
            const physicianHasRef =  await Appointment.findOne({
                where: {physicianId},
            }).catch((error) => {
                res.status(500).json({ msg: "Falha de conexão."});
            });
            if (physicianHasRef)
                return res.status(403).json({ msg: "Médico possui consulta em seu nome." });
        });
        if (deletedPhysician != 0)
            res.status(200).json({ msg: "Médico excluido com sucesso."});
        else
            res.status(404).json({ msg: "Médico não encontrado." });
    },
};
