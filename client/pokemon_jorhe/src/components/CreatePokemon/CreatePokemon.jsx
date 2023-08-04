import styles from "./CreatePokemon.module.css";

import { useState } from "react"
import { validateName, validateImage, valHp, valAttack, valDefense,
valSpeed, valHeight, valWeight} from "./validation";
import axios from 'axios';


const CreatePokemon = () => {

    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [pokeData, setPokemonData] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: '',
    })

    const [errors, setErrors] = useState({})

    const handleOnChange = (event) =>{
        setPokemonData({
            ...pokeData,
            [event.target.name]: event.target.value
        })
        if (event.target.name === "name" || event.target.name === "image" || event.target.name === "hp" 
        || event.target.name === "attack" || event.target.name === "defense" || event.target.name === "speed"
        || event.target.name === "height" || event.target.name === "weight" ) {
            validate({
              ...pokeData,
              [event.target.name]: event.target.value
          });
          }

    }

    const validate = ({name, image, hp, attack, defense, speed, height, weight}) => {
        const errors = {};

        const nameError =validateName(name);
        if (nameError) {
            errors.name = nameError
        }

        const imageError = validateImage(image);
        if(imageError){
            errors.image = imageError
        }

        const hpError = valHp(hp);
        if(hpError){
            errors.hp = hpError
        }

        const attackError = valAttack(attack);
        if(attackError){
            errors.attack = attackError
        }

        const defenseError = valDefense(defense);
        if(defenseError){
            errors.defense = defenseError
        }

        const speedError = valSpeed(speed);
        if(speedError){
            errors.speed = speedError
        }
        
        const heightError = valHeight(height);
        if(heightError){
            errors.height = heightError
        }

        const weightError = valWeight(weight);
        if(weightError){
            errors.weight = weightError
        }

        setErrors(errors);

    }


    const handleTypeChange = (event) => {
      const typeValue = event.target.value;
      if (event.target.checked) {
        setSelectedTypes((prevTypes) => [...prevTypes, typeValue]);
      } else {
        setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== typeValue));
      }
    };


      // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); 

    const dataToSend = {
        name: pokeData.name,
        image: pokeData.image,
        hp: pokeData.hp,
        attack: pokeData.attack,
        defense: pokeData.defense,
        speed: pokeData.speed,
        height: pokeData.height,
        weight: pokeData.weight,
        typeId: selectedTypes, 
      };

      console.log('Data to send:', dataToSend);

      axios.post('http://localhost:3001/pokemons', dataToSend)
      .then((response) => {
        console.log('Response from server:', response.data);
        setIsSubmitted(true); 
        setPokemonData({ 
          name: '',
          image: '',
          hp: '',
          attack: '',
          defense: '',
          speed: '',
          height: '',
          weight: '',
          types: '',
        });
        setSelectedTypes([]); 
        setErrors({}); 
      })
      .catch((error) => {
        console.error('Error during POST request:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ server: 'The Pokémon with this name already exists. Please choose a different name.' });
        } else {
          setErrors({ server: 'Something went wrong. Please try again later.' });
        }
      });
  };
  

  return (
    <div className={styles.container}>
    <div className={styles.boxForm}>
      <form className={styles.form} autoComplete="off">

        <div className={styles.index}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={pokeData.name} onChange={handleOnChange}/>
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <div>
                <label>Image:</label>
                <input type="text" name="image" value={pokeData.image} onChange={handleOnChange}/>
                {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>
        </div>

        <div className={styles.details}>

        <div>
        <label>HP:</label>
        <input type="number" name="hp" value={pokeData.hp} onChange={handleOnChange}/>
        {errors.hp && <p className={styles.error}>{errors.hp}</p>}
        </div>

        <div>
        <label>Attack:</label>
        <input type="number" name="attack" value={pokeData.attack} onChange={handleOnChange}/>
        {errors.attack && <p className={styles.error}>{errors.attack}</p>}
        </div>

        <div>
        <label>Defense:</label>
        <input type="number" name="defense" value={pokeData.defense} onChange={handleOnChange}/>
        {errors.defense && <p className={styles.error}>{errors.defense}</p>}
        </div>

        <div>
        <label>Speed:</label>
        <input type="number" name="speed" value={pokeData.speed} onChange={handleOnChange}/>
        {errors.speed && <p className={styles.error}>{errors.speed}</p>}
        </div>

        <div>
        <label>Height:</label>
        <input type="number" name="height" value={pokeData.height} onChange={handleOnChange}/>
        {errors.height && <p className={styles.error}>{errors.height}</p>}
        </div>

        <div>
        <label>Weight:</label>
        <input type="number" name="weight" value={pokeData.weight} onChange={handleOnChange}/>
        {errors.weight && <p className={styles.error}>{errors.weight}</p>}
        </div>

        </div>
        <p>Selecciona los tipos:</p>

        <div className={styles.types}>
        <label>
          <input type="checkbox" name="type" value="1" checked={selectedTypes.includes("1")} onChange={handleTypeChange}/>
          Normal
        </label>
        <label>
          <input type="checkbox" name="type" value="2" checked={selectedTypes.includes("2")} onChange={handleTypeChange}/>
          Fighting
        </label>
        <label>
          <input type="checkbox" name="type" value="3" checked={selectedTypes.includes("3")} onChange={handleTypeChange}/>
          Flying
        </label>
        <label>
          <input type="checkbox" name="type" value="4" checked={selectedTypes.includes("4")} onChange={handleTypeChange}/>
          Poison
        </label>
        <label>
          <input type="checkbox" name="type" value="5" checked={selectedTypes.includes("5")} onChange={handleTypeChange}/>
          Ground
        </label>
        <label>
          <input type="checkbox" name="type" value="6" checked={selectedTypes.includes("6")} onChange={handleTypeChange}/>
          Rock
        </label>
        <label>
          <input type="checkbox" name="type" value="7" checked={selectedTypes.includes("7")} onChange={handleTypeChange}/>
          Bug
        </label>
        <label>
          <input type="checkbox" name="type" value="8" checked={selectedTypes.includes("8")} onChange={handleTypeChange}/>
          Ghost
        </label>
        <label>
          <input type="checkbox" name="type" value="9" checked={selectedTypes.includes("9")} onChange={handleTypeChange}/>
          Steel
        </label>
        <label>
          <input type="checkbox" name="type" value="10" checked={selectedTypes.includes("10")} onChange={handleTypeChange}/>
          Fire
        </label>
        <label>
          <input type="checkbox" name="type" value="11" checked={selectedTypes.includes("11")} onChange={handleTypeChange}/>
          Water
        </label>
        <label>
          <input type="checkbox" name="type" value="12" checked={selectedTypes.includes("12")} onChange={handleTypeChange}/>
          Grass
        </label>
        <label>
          <input type="checkbox" name="type" value="13" checked={selectedTypes.includes("13")} onChange={handleTypeChange}/>
          Electric
        </label>
        <label>
          <input type="checkbox" name="type" value="14" checked={selectedTypes.includes("14")} onChange={handleTypeChange}/>
          Phychic
        </label>
        <label>
          <input type="checkbox" name="type" value="15" checked={selectedTypes.includes("15")} onChange={handleTypeChange}/>
          Ice
        </label>
        <label>
          <input type="checkbox" name="type" value="16" checked={selectedTypes.includes("16")} onChange={handleTypeChange}/>
          Dragon
        </label>
        <label>
          <input type="checkbox" name="type" value="17" checked={selectedTypes.includes("17")} onChange={handleTypeChange}/>
          Dark
        </label>
        <label>
          <input type="checkbox" name="type" value="18" checked={selectedTypes.includes("18")} onChange={handleTypeChange}/>
          Fairy
        </label>
        <label>
          <input type="checkbox" name="type" value="19" checked={selectedTypes.includes("19")} onChange={handleTypeChange}/>
          Unknown
        </label>
        <label>
          <input type="checkbox" name="type" value="20" checked={selectedTypes.includes("20")} onChange={handleTypeChange}/>
          Shadow
        </label>
        </div>


        <button type="submit" onClick={handleSubmit} disabled={!pokeData.name || !pokeData.image  || !pokeData.hp || !pokeData.attack || !pokeData.defense ||  Object.keys(errors).length > 0 } >CREATE</button>

      </form>
      </div>

      <div className={styles.create}>
        <h1>Create your Pokemon</h1>
        <div className={styles.box}>
          <div className={styles.image}>
          {pokeData.image && <img src={pokeData.image} alt={pokeData.name} className={styles.img}  />}
          </div>
          
          <div className={styles.info}>
            <h2>{pokeData.name}</h2>
          </div>
          </div>
          {isSubmitted && <p>Pokemon create successfully!</p>}
          {errors.server && <p className={styles.error}>{errors.server}</p>}


      </div>
    </div>

  );
};

export default CreatePokemon;
