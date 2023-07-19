const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {
    const Pokemons = sequelize.define('pokemons', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false  
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{timestamps:false})

    return Pokemons;
}