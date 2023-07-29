import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ id, name, image, types }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.image}></div>
        <img src={image} alt={name} className={styles.image} />

        <div className={styles.info}>
          <NavLink to={`/detail/${id}`} className={styles.namelink}>
            <h2>{name}</h2>
            <h3>#0{id}</h3>
          </NavLink>


        </div>

        <div className={styles.tipo}>
        {types.map(({ slot, type }) => (
            <span key={slot} className={styles.type}>
              {type.name}
            </span>
          ))}
        </div>


      </div>
    </div>
  );
};
export default Card;