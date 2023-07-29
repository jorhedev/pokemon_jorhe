import {
  GET_POKEMONS,
  GET_POKEMONS_NAME,
  FILTER,
  ORDER,
  ORDER_ATTACK,
  RESET,
} from "./actions";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  originalPokemons: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        originalPokemons: action.payload,
        filteredPokemons: action.payload,
      };
    case GET_POKEMONS_NAME:
      return { ...state, filteredPokemons: [action.payload] };

    case FILTER:
      return {
        ...state,
        filteredPokemons: state.pokemons.filter((pokemon) =>
          pokemon.types.some((typeObj) => typeObj.type.name === action.payload)
        ),
      };

    case ORDER: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) => {
        if (a.name > b.name) {
          return action.payload === "Ascendente" ? 1 : -1;
        }
        if (a.name < b.name) {
          return action.payload === "Descendente" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredPokemons: sortedPokemons,
      };
    }

    case ORDER_ATTACK:{
      const attackPokemons = [...state.filteredPokemons].sort((a, b) => {
        if (a.attack < b.attack) {
          return action.payload === "hight-HP" ? 1 : -1;
        }
        if (a.attack > b.attack) {
          return action.payload === "low-HP" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredPokemons: attackPokemons,
      };
    }

    case RESET:
      return {
        ...state,
        filteredPokemons: state.originalPokemons,
      };
    default:
      return { ...state };
  }
};

export default reducer;
