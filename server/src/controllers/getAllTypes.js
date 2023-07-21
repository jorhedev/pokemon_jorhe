const axios = require('axios');
const {Type} = require('../db')

const URL = 'https://pokeapi.co/api/v2/type/'

async function getAllTypes () {
  try {
    const {data} = await axios(`${URL}`);

    if(!data) throw Error('Not Found')

     data.results.forEach(({name}) => {
        Type.create({name})
    })

    console.log('loading correct');
  } catch (error) {
    console.log('not loading types');
  }
};

module.exports = getAllTypes;
