import styles from "./HomePage.module.css";

import Cards from "../Cards/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();

  //se hara el dispatch cuando home se renderize
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className={styles.container}>

      <Cards />
    </div>
  );
};

export default HomePage;
