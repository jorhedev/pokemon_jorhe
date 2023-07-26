import styles from "./Login.module.css";
import { useState, useEffect  } from "react";
import {useNavigate} from "react-router-dom";


const Login = () => {

const navigate = useNavigate();
const [access, setAccess] = useState(false);

const login = async () => {
  try {
    setAccess(true);
    access && navigate("/home");
  } catch (error) {
    console.log(error.message);
  }
};

useEffect(() => {
  if (access) {
    navigate("/home");
  }
}, [access, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h1>POKEMON</h1>
          <h3>by Jorge Tolentino</h3>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={login}>START</button>
      </div>
    </div>
  );
};

export default Login;
