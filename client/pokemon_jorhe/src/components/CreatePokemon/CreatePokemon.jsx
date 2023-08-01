import styles from "./CreatePokemon.module.css";
import { useState } from "react"
import { validateName, validateImage, valHp, valAttack, valDefense,
valSpeed, valHeight, valWeight} from "./validation";
import axios from 'axios';


const CreatePokemon = () => {

    const [pokeData, setPokemonData] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
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
            validate();
          }

    }

    const validate = () => {
        const errors = {};

        const nameError =validateName(pokeData.name);
        if (nameError) {
            errors.name = nameError
        }

        const imageError = validateImage(pokeData.image);
        if(imageError){
            errors.image = imageError
        }

        const hpError = valHp(pokeData.hp);
        if(hpError){
            errors.hp = hpError
        }

        const attackError = valAttack(pokeData.attack);
        if(attackError){
            errors.attack = attackError
        }

        const defenseError = valDefense(pokeData.defense);
        if(defenseError){
            errors.defense = defenseError
        }

        const speedError = valSpeed(pokeData.speed);
        if(speedError){
            errors.speed = speedError
        }
        
        const heightError = valHeight(pokeData.height);
        if(heightError){
            errors.height = heightError
        }

        const weightError = valWeight(pokeData.weight);
        if(weightError){
            errors.weight = weightError
        }

        setErrors(errors);

    }


      // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const dataToSend = {
        name: pokeData.name,
        image: pokeData.image,
        hp: pokeData.hp,
        attack: pokeData.attack,
        defense: pokeData.defense,
        speed: pokeData.speed,
        height: pokeData.height,
        weight: pokeData.weight,
        typeId: [1, 2, 3], // Suponiendo que tienes un array de ids de tipos
      };

      axios.post('http://localhost:3001/pokemons', dataToSend)
      .then((response) => {
        console.log('Response from server:', response.data);
        // Realiza cualquier acción adicional después de recibir la respuesta del servidor
      })
      .catch((error) => {
        console.error('Error during POST request:', error);
      });
  };

  return (
    <div className={styles.container}>
    <h1>Create your Pokemon</h1>
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


        <button type="submit" onClick={handleSubmit} disabled={!pokeData.name || !pokeData.image  || !pokeData.hp || !pokeData.attack || !pokeData.defense || Object.keys(errors).length > 0 } >CREATE</button>

      </form>
      </div>
    </div>
  );
};

export default CreatePokemon;
