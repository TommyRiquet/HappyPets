module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("Admin", {
        Type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })

    Admin.associate = (models) => {
        Admin.belongsTo(models.Users)
    }

    return Admin;
}