const axios = require('axios');

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=100'

const getPokemons = async (req, res) => {
    try{
        const { data } = await axios(`${URL}`)

        if(!data) throw Error('Not Found')
    
        const results = data.results;

        const allPokemonData = [];

        const fetchPokemonData = async (url) => {
            const { data } = await axios.get(url);
            const { id, name, sprites, types, stats } = data;
            const pokemonData = {
                id,
                name,
                image: sprites.other["official-artwork"].front_default,
                types,
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

    }catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getPokemons