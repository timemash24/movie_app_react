import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigator from '../components/Navigator';
import Loading from './Loading';
import styles from './Detail.module.css';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const getMovie = async () => {
    try {
      const res = await axios.get('https://yts.mx/api/v2/movie_details.json', {
        params: {
          movie_id: id,
        },
      });
      setLoading(false);
      setMovie(res.data.data.movie);
    } catch (error) {
      throw new Error(`Failed to load movie description! ${error}`);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main className={styles.main}>
          <Navigator />
          <section className={styles.details}>
            <img
              className={styles.details__img}
              src={movie.large_cover_image}
              alt={movie.title}
            />
            <div className={styles.details__info}>
              <h1 className={styles.details__title}>{movie.title_long}</h1>
              <ul className={styles.details__genres}>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <ul className={styles.details__more}>
                <li>
                  <i className="fa-solid fa-language"></i>
                  {movie.language.toUpperCase()}
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                  {movie.rating}
                </li>
                <li>
                  <i className="fa-solid fa-stopwatch"></i>
                  {movie.runtime} min
                </li>
              </ul>
              <p className={styles.details__desc}>{movie.description_full}</p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default Detail;
