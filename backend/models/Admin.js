module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("Admin", {
        ClientName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SuspectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ClientID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SuspectID: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return Admin;
}