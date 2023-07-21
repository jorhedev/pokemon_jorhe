const axios = require("axios");
const { Op } = require('sequelize');
const { Pokemons } = require('../db');

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
        });
    
        // Buscar en la API si no se encontraron en la base de datos
        if (dbPokemons.length === 0) {
          try {
            const { data } = await axios(`${URL}${lowercaseName}`);
    
            // Si se encontró en la API, devolver los datos del Pokémon
            const pokemonData = {
              id: data.id,
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              speed: data.stats[5].base_stat,
              height: data.height,
              weight: data.weight,
            };
    
            return res.status(200).json([pokemonData]);
          } catch (error) {
            // Si no se encontró en la API, mostrar mensaje adecuado
            return res.status(404).json({ message: 'No Pokemon found with that name' });
          }
        }
    
        // Si se encontraron en la base de datos, devolver los datos de los Pokémon
        const pokemonData = dbPokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          speed: pokemon.speed,
          height: pokemon.height,
          weight: pokemon.weight,
        }));
    
        return res.status(200).json(pokemonData);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

module.exports = getPokemonsName;
