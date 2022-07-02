import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.loading}>
      <img src={require('../img/loading.gif')} alt="loading" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
