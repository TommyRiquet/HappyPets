module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("Admin", {
        UserName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
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
        Admin.belongsTo(models.Users, {
        foreignKey: 'SuspectId', targetKey: 'id'})
    }

    return Admin;
}