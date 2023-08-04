const axios = require("axios");
const { Op } = require('sequelize');
const { Pokemons, Type } = require('../db');

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonsName = async (req, res) => {
    try {
        const { name } = req.query;
    
        if (!name) {
          return res.status(400).json({ message: 'Name parameter is required' });
        }

        const lowercaseName = name.toLowerCase(); 
    
        // Buscar en la base de datos
        const dbPokemons = await Pokemons.findAll({
          where: {
            name: {
              [Op.iLike]: `%${lowercaseName}%`,
            },
          },
          include: {
            model: Type,
            attributes: ['name'],
          },
        });

 
        // Buscar en la API si no se encontraron en la base de datos
        if (dbPokemons.length === 0) {
          try {
            const { data } = await axios(`${URL}${lowercaseName}`);
            const {id, name, sprites, types} =data;
            // Si se encontró en la API, devolver los datos del Pokémon
            const pokemonData = {
              id,
              name,
              image: sprites.other["official-artwork"].front_default,
              types: types.map((typeData) => {
                if (typeData.type.name) {
                  return {
                    name: typeData.type.name,
                  };
                }
              }),
            };
    
            return res.status(200).json(pokemonData);
          } catch (error) {
            // Si no se encontró en la API, mostrar mensaje adecuado
            return res.status(404).json({ message: 'No Pokemon found with that name' });
          }
        }
    
        // Si se encontraron en la base de datos, devolver los datos de los Pokémon
        const pokemonData = dbPokemons.map((pokemon) => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            types: pokemon.Types.map((type) => ({
              name: type.name,
            })),
          };
        });

    
        return res.status(200).json(pokemonData.length === 1 ? pokemonData[0] : pokemonData);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

module.exports = getPokemonsName;
