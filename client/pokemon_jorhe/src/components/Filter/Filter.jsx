import styles from './Filter.module.css'

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { filterCards, orderCards, orderAttack, reset, setIndexPage, setSources } from "../../redux/actions";


const Filter = () => {
    const dispatch = useDispatch();
    const indexPage = useSelector((state) => state.indexPage);


  const [order, setOrder] = useState("");
  const [orderA, setOrderA] = useState("");
  const [filter, setFilter] = useState("");
  const [source, setSource] = useState("");


  const handleReset = () => {

    dispatch(setSources(null));
    setOrderA("");
    setOrder("");
    setFilter("");
    setSource("");
    dispatch(reset());
    dispatch(setIndexPage(indexPage));

  };

  const handleOrderAttack = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(orderAttack(value));
    dispatch(orderAttack(value));
    setOrderA(value);
  };

  const handleOrder = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(orderCards(value));
    dispatch(orderCards(value));
    setOrder(value);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(filterCards(value));
    setFilter(value);
  };

  const handleSourceChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(setSources(value));
    setSource(value);
  };

  return (
      <div className={styles.filter}>
        <h3>FILTER</h3>

        <select
        className={styles.buttons}
        value={source} // Asegúrate de utilizar el estado correcto para el valor seleccionado
        onChange={handleSourceChange}
        name="source"
      >
        <option value="" disabled>
          SOURCE
        </option>
        <option value="API">API</option>
        <option value="DB">DB</option>
      </select>

        <select
          className={styles.buttons}
          value={orderA}
          onChange={handleOrderAttack}
          name="orderA"
        >
          <option value="" disabled>
            ORDER ATTACK
          </option>
          <option value="hight-HP">hight HP</option>
          <option value="low-HP">low HP</option>
        </select>

        <select
          className={styles.buttons}
          value={order}
          onChange={handleOrder}
          name="order"
        >
          <option value="" disabled>
            SELECT ORDER
          </option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
        <select
          className={styles.buttons}
          value={filter}
          onChange={handleFilter}
          name='filter'
        >
          <option value='' disabled>
            SELECT TYPES
          </option>
          <option value='normal'>Normal</option>
          <option value='fighting'>Fighting</option>
          <option value='flying'>Flying</option>
          <option value='poison'>Poison</option>
          <option value='ground'>Ground</option>
          <option value='rock'>Rock</option>
          <option value='bug'>Bug</option>
          <option value='ghost'>Ghost</option>
          <option value='steel'>Steel</option>
          <option value='fire'>Fire</option>
          <option value='water'>Water</option>
          <option value='grass'>Grass</option>
          <option value='electric'>Electric</option>
          <option value='psychic'>Psychic</option>
          <option value='ice'>Ice</option>
          <option value='dragon'>Dragon</option>
          <option value='dark'>Dark</option>
          <option value='fairy'>Fairy</option>
          <option value='unknown'>Unknown</option>
          <option value='shadow'>Shadow</option>
        </select>
        <button className={styles.buttons} onClick={handleReset}>
          RESET
        </button>
      </div>
  );
};

export default Filter;
