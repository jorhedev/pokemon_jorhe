const axios = require("axios");
const { Pokemons, Type } = require("../db");
const { Op } = require("sequelize");


const postPokemons = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, typeId } =
      req.body;

    if (!name || !image || !hp || !attack || !defense || !typeId) {
      return res.status(400).json({ message: "Missing required data" });
    }

    if (!Array.isArray(typeId)) {
      return res.status(400).json({ message: "Invalid types data" });
    }

    const existingPokemon = await Pokemons.findOne({
      where: {
        name: name
      }
    });

    if (existingPokemon) {
      return res.status(409).json({ message: "Pokemon already exists" });
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
