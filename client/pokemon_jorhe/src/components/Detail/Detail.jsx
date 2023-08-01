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
          setPokemon(data);
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
    //   <div className={styles.container}>
    //   <div className={styles.aboutContent}>
    //   {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
    //   <div className={styles.aboutMe}>
    //   <h2>{pokemon.name}</h2>
   

    //   {pokemon.origin && <p><span> Origin: </span>{pokemon.origin.name}</p>}
    //   </div>
    // </div>
    // </div>

    <div className={styles.container}>
      <div className={styles.cardDetail}>
        <div className={styles.cardAbout}>
        {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className={styles.img}/>}
        <div className={styles.aboutPokemon}>
          <h2>{pokemon.name}</h2>
          <p><span>ID: </span>{pokemon.id}</p>
          <p><span> HP: </span>{pokemon.hp}</p>
          <p><span> Attack: </span>{pokemon.attack}</p>
          <p><span> Defense:</span> {pokemon.defense}</p>
          <p><span> Speed:</span> {pokemon.speed}</p>
          <p><span> Height:</span> {pokemon.height}</p>
          <p><span> Weight:</span> {pokemon.weight}</p>
        {pokemon.types && (
          <p>
            <span>Types:</span>
            {pokemon.types.map((typeData) => (
              <span key={typeData.type.name}>{typeData.type.name} </span>
            ))}
          </p>
        )}      
          </div>
        </div>
      </div>

    </div>
  );
};

export default Detail;
