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
        Age: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Postal: {
            type: DataTypes.INTEGER,
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
        Role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhotoLink: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ColorPhoto: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })
    
     Users.associate = (models) => {
        Users.hasMany(models.Pets, {
             onDelete: "cascade"
        })
        Users.hasMany(models.Propositions, {
                onDelete: "cascade"
        })
     }

    return Users;
}