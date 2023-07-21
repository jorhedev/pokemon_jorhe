import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h1>POKEMON</h1>
          <h3>by Jorge Tolentino</h3>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button>START</button>
      </div>
    </div>
  );
};

export default Login;
