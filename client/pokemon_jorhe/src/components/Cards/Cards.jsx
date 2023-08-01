import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";

import { useSelector } from "react-redux";
import styles from "./Cards.module.css";


const Cards = () => {
  const updatedShowPokemons  = useSelector(state=> state.updatedShowPokemons )
  return (
    <div className={styles.container}>
      <div>
      <SearchBar/>
      <Filter/>
      </div>

      <div className={styles.cards}>
        {updatedShowPokemons .map(pokemon => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
