import styles from "./Footer.module.css";
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.fBox}>
            <div className={styles.iconA}>
            <NavLink activeClassName={styles.active} to='/about'>About Me</NavLink>
            </div>
            </div>
            <div className={styles.fBox}>
            <p>PokeApi by Jorge © 2023.</p>
            </div>
            <div className={styles.fBox}>
            <div className={styles.icon}>
                <NavLink activeClassName={styles.active} to='https://github.com/jorhedev' target="_blank"><AiFillGithub/></NavLink>
                <NavLink activeClassName={styles.active} to='https://www.linkedin.com/in/hijorhe/' target="_blank"><AiFillLinkedin/></NavLink>            </div>
            </div>
        </div>

    </div>
  );
};

export default Footer;
