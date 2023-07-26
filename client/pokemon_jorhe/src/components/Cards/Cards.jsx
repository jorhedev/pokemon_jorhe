import Card from "../Card/Card";

import { useSelector } from "react-redux";
import styles from "./Cards.module.css";

const Cards = () => {
  // const URL = "http://localhost:3001/pokemons";
  // const [pokemons, setPokemons] = useState([]);

  // useEffect(() => {
  //   const fetchPokemons = async () => {
  //     try {
  //       const { data } = await axios(URL);
  //       setPokemons(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchPokemons();
  // }, []);

  const pokemons = useSelector(state=> state.pokemons)

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {pokemons.map(pokemon => (
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
