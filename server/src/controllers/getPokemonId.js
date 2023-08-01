const axios = require("axios");
const { Pokemons, Type } = require("../db");
const { isUUID } = require("validator");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonsId = async (req, res) => {
  try {
    const { idPokemon } = req.params;

    if (isUUID(idPokemon)) {
      const dbData = await Pokemons.findOne({
        where: { id: idPokemon },
        include: Type,
      });

      const pokemonData = {
        id: dbData.id,
        name: dbData.name,
        image: dbData.image,
        hp: dbData.hp,
        attack: dbData.attack,
        defense: dbData.defense,
        speed: dbData.speed,
        height: dbData.height,
        weight: dbData.weight,
        types: dbData.Types.map((type) => type.name),
      };
      res.status(200).json(pokemonData);
    }

    try {
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
    } catch (error) {
      res.status(404).json({ message: "Pokemon not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPokemonsId;
