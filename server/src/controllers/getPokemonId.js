const axios = require("axios");
const { Pokemons, Type } = require("../db");
const { isUUID } = require("validator");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonsId = async (req, res) => {
  let responseSent = false;

  try {
    const { idPokemon } = req.params;

    if (isUUID(idPokemon)) {
      const dbPokemon = await Pokemons.findOne({
        where: { id: idPokemon },
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    if (dbPokemon) {
      const pokemonData = {
        id: dbPokemon.id,
        name: dbPokemon.name,
        image: dbPokemon.image,
        hp: dbPokemon.hp,
        attack: dbPokemon.attack,
        defense: dbPokemon.defense,
        speed: dbPokemon.speed,
        height: dbPokemon.height,
        weight: dbPokemon.weight,
        types: dbPokemon.Types.map((type) => ({
          name: type.name,
        })),
      };

      res.status(200).json(pokemonData);
      responseSent = true; 
      return;
    }
  }

  if (!responseSent) {
      const { data } = await axios(`${URL}${idPokemon}`);

      if (!data) throw Error("Not Found");

      const pokemonData = {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types
      };

      res.status(200).json(pokemonData);
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPokemonsId;
