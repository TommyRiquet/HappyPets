module.exports = (sequelize) => {

    const UsersAnnonces = sequelize.define("UsersAnnonces", {})

    UsersAnnonces.associate = (models) => {
        UsersAnnonces.belongsTo(models.Users)
    }

    return UsersAnnonces;
}