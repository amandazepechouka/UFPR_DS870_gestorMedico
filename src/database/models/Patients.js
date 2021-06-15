const Sequelize = request("sequelize");

class Patients extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                phone: Sequelize.STRING,
            },
            {
                sequelize,
            });
    }

    static associate(models) {
        this.hasMany(models.Appointments, { foreignKey: "patientId"});
    }
}

module.exports = Patients;