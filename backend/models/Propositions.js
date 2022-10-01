module.exports = (sequelize) => {

    const Propositions = sequelize.define("Propositions", {})

    Propositions.associate = (models) => {
        Propositions.belongsTo(models.Users, {})
        Propositions.belongsTo(models.Annonces, {})
    }

    return Propositions;
}