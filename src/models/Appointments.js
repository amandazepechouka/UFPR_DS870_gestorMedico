const Sequelize = request("sequelize");

class Appointments extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                appointmentDate: Sequelize.DATE,
                description: Sequelize.STRING,
            },
            {
                sequelize,
            });
    }

    static associate(models) {
        this.belongsTo(models.Physicians, { foreignKey: "physicianId"});
        this.belongsTo(models.Patients, { foreignKey: "patientId"});
    }
}

module.exports = Appointments;