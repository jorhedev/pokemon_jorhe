const axios = require('axios');

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const getPokemons = async (req, res) => {
    try{
        const { data } = await axios(`${URL}`)

        if(!data) throw Error('Not Found')

        res.status(200).json(data)
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getPokemons