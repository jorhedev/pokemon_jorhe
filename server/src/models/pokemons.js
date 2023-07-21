const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {
    const Pokemons = sequelize.define('pokemons', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
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
        },
        height: {
            type: DataTypes.INTEGER,
        },
        weight:{
            type: DataTypes.INTEGER,
        }
    },{timestamps:false})
    
    return Pokemons;
}