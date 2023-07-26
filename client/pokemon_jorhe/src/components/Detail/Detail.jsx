import axios from 'axios'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css'

const Detail = () => {
    const {id} = useParams()
    const [pokemon, setPokemon] = useState({});

      
    useEffect(() => {
        axios(`http://localhost:3001/pokemons/id/${id}`)
          .then(({ data }) => {
            if (data.name) {
              setPokemon(data);
            } else {
              window.alert('No hay personajes con ese ID');
            }
          })
          .catch((error) => {
            console.error('Error retrieving character details:', error);
          });
    
        return () => {
          setPokemon({});
        };
      }, [id]);
      
return (
    <div className={styles.container}>
    <div className={styles.aboutContent}>
    {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
    <div className={styles.aboutMe}>
    <h2>{pokemon.name}</h2>
    <p><span>ID: </span>{pokemon.id}</p>
    <p><span> Status: </span>{pokemon.attack}</p>
    <p><span> Species: </span>{pokemon.species}</p>
    <p><span> Gender:</span> {pokemon.gender}</p>
    {pokemon.origin && <p><span> Origin: </span>{pokemon.origin.name}</p>}
    </div>
  </div>
  </div>
  );
};

export default Detail;
