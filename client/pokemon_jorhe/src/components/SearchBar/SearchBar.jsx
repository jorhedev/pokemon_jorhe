/* eslint-disable react/prop-types */
import styles from './SearchBar.module.css'

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPokemonsName } from "../../redux/actions";


const SearchBar = () =>{
    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleSubmit = () =>{
        dispatch(getPokemonsName(name));
    }

    const handleSearch = (event) => {
        setName(event.target.value)
      };


    return(
        <div className={styles.SearchBar}>
            <input 
            className={styles.input}
            placeholder="Search a Pokemon by name..."
            type="text" 
            value={name}
            onChange={handleSearch}
            />
            <button className={styles.buttons} onClick={handleSubmit}>BUSCAR</button>

        </div>
    )
}

export default SearchBar;