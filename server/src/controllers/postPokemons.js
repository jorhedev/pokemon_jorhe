const axios = require("axios");
const { Pokemons, Type } = require("../db");
const { Op } = require("sequelize");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const postPokemons = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, typeId } =
      req.body;

    // Verificar que se proporcionen todos los datos necesarios
    if (!name || !image || !hp || !attack || !defense || !typeId) {
      return res.status(400).json({ message: "Missing required data" });
    }

    if (!Array.isArray(typeId)) {
      return res.status(400).json({ message: "Invalid types data" });
    }

    // Crear el Pokémon en la base de datos
    const newPokemon = await Pokemons.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    });

    await newPokemon.setTypes(typeId);

    res
      .status(201)
      .json({ message: "Pokemon created successfully", data: newPokemon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = postPokemons;
