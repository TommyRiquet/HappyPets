module.exports = (sequelize, DataTypes) => {

    const Pets = sequelize.define("Pets", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Race: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Behaviour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    })

    Pets.associate = (models) => {
        Pets.belongsTo(models.Users, {})
        Pets.belongsToMany(models.Annonces, { 
            through : models.PetsAnnonces,
            onDelete: "cascade"
        })
    }

    return Pets;
}