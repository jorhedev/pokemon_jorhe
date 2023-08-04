import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";


const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});


  useEffect(() => {
    axios(`http://localhost:3001/pokemons/id/${id}`)
      .then(({ data }) => {
        if (data.name) {
          const types = data.types.map((typeData) => typeData.PokemonType || typeData);
          setPokemon({
            ...data,
            types: types,
          });        
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error retrieving character details:", error);
      });

    return () => {
      setPokemon({});
    };
  }, [id]);

  return (

    <div className={styles.container}>
      <div className={styles.cardDetail}>
        <div className={styles.cardAbout}>
        {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className={styles.img}/>}
        <div className={styles.aboutPokemon}>
          <h2>{pokemon.name}</h2>
          <div className={styles.data}>
          <p><span>ID: </span>{pokemon.id}</p>
          <p><span> HP: </span>{pokemon.hp}</p>
          <p><span> Attack: </span>{pokemon.attack}</p>
          <p><span> Defense:</span> {pokemon.defense}</p>
          <p><span> Speed:</span> {pokemon.speed}</p>
          <p><span> Height:</span> {pokemon.height}</p>
          <p><span> Weight:</span> {pokemon.weight}</p>
          </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Detail;
