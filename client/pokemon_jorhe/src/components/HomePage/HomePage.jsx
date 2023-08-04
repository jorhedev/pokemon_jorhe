import styles from "./HomePage.module.css";

import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, setIndexPage } from "../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();

  const indexPage = useSelector((state) => state.indexPage);
  const quantityPages = useSelector((state) => state.quantityPages);


  //se hara el dispatch cuando home se renderize
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleClick = (event) => {
    let direction = event.target.value;
    let index = direction === '+' ? indexPage - 1 : indexPage + 1;
    dispatch(setIndexPage(index));
    }


  return (
    <div className={styles.container}>
      
      <Cards />

      <div className={styles.paginate}>
                <button onClick={handleClick} value={'+'} disabled={indexPage === 1}>
                    Previus
                </button>
                <span>Page {indexPage} of {quantityPages || 1}</span>
                <button onClick={handleClick} value={'-'} disabled={indexPage >= quantityPages}>Next</button>
            </div>

      <Footer/>
    </div>
  );
};

export default HomePage;
