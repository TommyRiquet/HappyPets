const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    const Propositions = sequelize.define("Propositions", {

        Type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Frequence: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Animal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Nombre: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    })

    Propositions.associate = (models) => {
        
        Propositions.belongsTo(models.Users, {})

    }

    return Propositions;
}