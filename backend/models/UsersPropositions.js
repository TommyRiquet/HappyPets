module.exports = (sequelize) => {

    const UsersPropositions = sequelize.define("UsersPropositions", {})

    UsersPropositions.associate = (models) => {
        UsersPropositions.belongsTo(models.Users)
    }

    return UsersPropositions;
}