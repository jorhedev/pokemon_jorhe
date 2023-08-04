const axios = require('axios');
const { Pokemons, Type } = require('../db');


const URL = 'https://pokeapi.co/api/v2/pokemon?limit=150'

const getPokemons = async (req, res) => {
  try {

    let source = req.query.source;
    
    if (source === "null") {
      source = "";
    }


    if (!source || source === "") {
      const { data } = await axios(URL);
      if (!data) throw Error("Not Found");

      const results = data.results;

      const allPokemonData = [];

      const fetchPokemonData = async (url) => {
        const { data } = await axios.get(url);
        const { id, name, sprites, types, stats } = data;
        const pokemonData = {
          id,
          name,
          image: sprites.other["official-artwork"].front_default,
          types: types.map((typeData) => ({
            name: typeData.type.name,
          })),
          attack: stats[1].base_stat,
          source: "API", // Agregar un campo de "source" para identificar la fuente
        };
        return pokemonData;
      };

      const requests = results.map((result) => fetchPokemonData(result.url));
      const pokemonDataArray = await Promise.all(requests);

      pokemonDataArray.forEach((pokemonData) => {
        allPokemonData.push(pokemonData);
      });

      const dbPokemons = await Pokemons.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      const dbPokemonData = dbPokemons.map((dbPokemon) => ({
        id: dbPokemon.id,
        name: dbPokemon.name,
        image: dbPokemon.image,
        types: dbPokemon.Types.map((type) => ({
          name: type.name,
        })),
        attack: dbPokemon.attack,
        source: "DB", // Agregar un campo de "source" para identificar la fuente
      }));

      const combinedPokemonsData = [...allPokemonData, ...dbPokemonData];
      res.status(200).json(combinedPokemonsData); 
    }else if (source === "API") {
      // Si el source es "API", obtenemos los datos de la API
      const { data } = await axios(URL);

      if (!data) throw Error("Not Found");

      const results = data.results;

      const allPokemonData = [];

      const fetchPokemonData = async (url) => {
        const { data } = await axios.get(url);
        const { id, name, sprites, types, stats } = data;
        const pokemonData = {
          id,
          name,
          image: sprites.other["official-artwork"].front_default,
          types: types.map((typeData) => ({
            name: typeData.type.name,
          })),
          attack: stats[1].base_stat,
        };
        return pokemonData;
      };

      const requests = results.map((result) => fetchPokemonData(result.url));
      const pokemonDataArray = await Promise.all(requests);

      pokemonDataArray.forEach((pokemonData) => {
        allPokemonData.push(pokemonData);
      });

      res.status(200).json(allPokemonData);
    } else if (source === "DB") {
      // Si el source es "DB", obtenemos los datos de la base de datos
      const dbPokemons = await Pokemons.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      const dbPokemonData = dbPokemons.map((dbPokemon) => ({
        id: dbPokemon.id,
        name: dbPokemon.name,
        image: dbPokemon.image,
        types: dbPokemon.Types.map((type) => ({
          name: type.name,
        })),
        attack: dbPokemon.attack,
      }));

      res.status(200).json(dbPokemonData);
    }else {
      throw Error("Invalid source value"); // Manejar un valor de source inválido
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPokemons;