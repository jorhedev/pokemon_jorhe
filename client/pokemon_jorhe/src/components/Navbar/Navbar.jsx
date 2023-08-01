import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";

import pokebolaImage from "../../assets/pokeball.png"

const Navbar = () =>{
    const [access, setAccess] = useState(true);
    const navigate = useNavigate();

    function logout() {
        setAccess(true);
        navigate("/");
      }

      useEffect(() => {
        !access && navigate("/");
      }, [access, navigate]);

    return(
        <div className={styles.container}>
        <NavLink to='/home'>
        <img src={pokebolaImage} alt="Logo" />
        </NavLink>

        <ul className={styles.navUl}>
            <li><NavLink to='/form' className={styles.navButton}>CREATE POKEMON</NavLink></li>
            <li><button onClick={logout}>LOGOUT</button></li>
        </ul>
        </div>
    )
}

export default Navbar;