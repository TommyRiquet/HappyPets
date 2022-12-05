module.exports = (sequelize, DataTypes) => {

    const Annonces = sequelize.define("Annonces", {

        Type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DateBegin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        DateEnd: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })

    Annonces.associate = (models) => {
        
        Annonces.belongsToMany(models.Pets, { 
            through : models.PetsAnnonces,
            onDelete: "cascade"
        })
    }

    return Annonces;
}