const Physician = require("../models/Physicians");
const Appointment = require("../models/Appointments");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation(password) {
    if (password.length < 8)
        return "Senha deve ter no mínimo 8 caracteres.";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra.";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número.";
    else
        return "OK";
}

function gerateToken(id) {
    console.log(process.env.JWT_SECRET);
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 82800,
    });
    console.log(token);
    return token;
}

module.exports = {

    async newPhysician(req, res) {
        const { name, email, password} = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
        }

        const passwordValid = passwordValidation(password);
        if (passwordValid != "OK")
            return res.status(400).json({ msg: passwordValid });

        const isPhysicianNew = await Physician.findOne({
            where: { email},
        });
        
        if(isPhysicianNew) 
            res.status(403).json( { msg: "Médico já foi cadastrado."});
        else {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const physician = await Physician.create({
                name,
                email,
                password: hash,
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

    async authenticationPhysician(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password)
            return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
        
            try {
                const physician = await Physician.findOne({
                    where: { email },
                });
                if (!physician)
                    return res.status(404).json({ msg: "Usuário ou senha inválidos." });
                else {
                    if (bcrypt.compareSync(password, physician.password)){
                        const token = gerateToken(physician.id);
                        return res.status(200).json({ msg: "Autenticado com sucesso", token });
                    }
                    else
                        return res.status(404).json({ msg: "Usuário ou senha inválidos." });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
    },
};
