const axios = require('axios');

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const getPokemonsId = async (req, res) => {
    try{
        const { idPokemon } = req.params;
        const { data } = await axios(`${URL}${idPokemon}`)

        if(!data) throw Error('Not Found')
        
        const pokemonData = {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight
        }

        res.status(200).json(pokemonData)
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getPokemonsId