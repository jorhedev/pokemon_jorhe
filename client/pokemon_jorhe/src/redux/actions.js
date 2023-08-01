import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMONS_NAME = "GET_POKEMONS_NAME";
export const FILTER = "FILTER";
export const ORDER = "ORDER"
export const ORDER_ATTACK = "ORDER_ATTACK"
export const RESET = "RESET";
export const SET_INDEX_PAGE = "SET_INDEX_PAGE";


export const getPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/pokemons");
    const pokemons = apiData.data;
    
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const getPokemonsName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/pokemons/name?name=${name}`
    );
    const filteredPokemons = apiData.data;
    dispatch({
      type: GET_POKEMONS_NAME,
      payload: filteredPokemons,
    });
  };
};

export const filterCards = (types) => {
  return {
    type: FILTER,
    payload: types,
  };
};

export const orderCards = (orden) =>{
  return ({
     type: ORDER,
     payload: orden,
});
}

export const orderAttack = (ordenA) =>{
  return ({
     type: ORDER_ATTACK,
     payload: ordenA,
});
}

export const reset = () => {
  return {
    type: RESET,
  };
};

export const setIndexPage = (index) => {
  return {
    type: SET_INDEX_PAGE,
    payload: index,
  };
};



// export const getPokemon = (id) => {
//   return async function (dispatch) {
//     const apiData = await axios.get(`http://localhost:3001/pokemons/id/${id}`);
//     const pokemon = apiData.data;
//     dispatch({type: GET_POKEMON, payload: pokemon});
//   };
// };
