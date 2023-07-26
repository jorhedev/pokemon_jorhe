import { NavLink } from 'react-router-dom';
import styles from "./Navbar.module.css";

import pokebolaImage from "../../assets/pokeball.png"

const Navbar = () =>{
    return(
        <div className={styles.container}>
        <NavLink to='/home'>
        <img src={pokebolaImage} alt="Logo" />
        </NavLink>
        </div>
    )
}

export default Navbar;