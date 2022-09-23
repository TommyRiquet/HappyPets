module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    Users.associate = (models) => {
        Users.hasMany(models.Pets, {
            onDelete: "cascade"
        })
    }


    return Users;
}