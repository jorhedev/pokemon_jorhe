import {
  GET_POKEMONS,
  GET_POKEMONS_NAME,
  FILTER,
  ORDER,
  ORDER_ATTACK,
  RESET,
  SET_INDEX_PAGE,
  SET_SOURCE,
} from "./actions";

const initialState = {
  source: "API",
  pokemons: [],
  filteredPokemons: [],
  originalPokemons: [],
  updatedShowPokemons: [],
  indexPage: 1,
  quantityPokemons: 12,
  indexFirstPokemon: 0,
  indexLastPokemon: 12,
  quantityPages: 1,
  prevIndexPage: 1,
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        originalPokemons: action.payload,
        filteredPokemons: action.payload,
        updatedShowPokemons: action.payload.slice(state.indexFirstPokemon, state.indexLastPokemon),
        quantityPages: Math.ceil(action.payload.length / state.quantityPokemons),

      };


    case GET_POKEMONS_NAME:
      return { ...state, updatedShowPokemons: [action.payload] };

    case FILTER:
      return {
        ...state,
        updatedShowPokemons: state.pokemons.filter((pokemon) =>
          pokemon.types?.some((types) => types.name === action.payload)
        ),
      };

    case ORDER: {
      const sortedPokemons = [...state.updatedShowPokemons].sort((a, b) => {
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
        updatedShowPokemons: sortedPokemons,
      };
    }

    case ORDER_ATTACK:{
      const attackPokemons = [...state.updatedShowPokemons].sort((a, b) => {
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
        updatedShowPokemons: attackPokemons,
      };
    }

    case SET_INDEX_PAGE:
      {
      let index = action.payload || state.indexPage;
      let first = (index - 1) * state.quantityPokemons;
      let last = index * state.quantityPokemons;
      let update = state.pokemons.slice(first, last);
      return {
          ...state,
          indexPage: index,
          indexLastPokemon: last,
          indexFirstPokemon: first,
          updatedShowPokemons: update,
          prevIndexPage: state.indexPage, // Actualiza la propiedad prevIndexPage
      };
    }

    case SET_SOURCE:{
      const source = action.payload; // Obtiene el valor de "source" del payload de la acción

      const updatedShowPokemons = state.originalPokemons.filter((pokemon) => {
        return source === "" || pokemon.source === source;
      });

      return {
        ...state,
        source,
        updatedShowPokemons,
      };
    }

    case RESET:
      return {
        ...state,
        filteredPokemons: state.originalPokemons,
        indexPage: state.prevIndexPage, // Restaura la página previa
        indexFirstPokemon: (state.prevIndexPage - 1) * state.quantityPokemons, // Calcula el índice del primer pokémon para la página actual
        indexLastPokemon: state.prevIndexPage * state.quantityPokemons, // Calcula el índice del último pokémon para la página actual
        updatedShowPokemons: state.pokemons.slice((state.prevIndexPage - 1) * state.quantityPokemons, state.prevIndexPage * state.quantityPokemons), // Actualiza la lista de pokémon para mostrar los de la página actual
      };
    default:
      return { ...state };
  }
};

export default reducer;
