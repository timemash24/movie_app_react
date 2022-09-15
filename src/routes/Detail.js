import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigator from '../components/Navigator';
import Loading from './Loading';
import Movie from '../components/Movie';
import styles from './Detail.module.css';

function Detail() {
  const API_END_POINT = 'https://yts.mx/api/v2';
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const { id } = useParams();
  console.log(id);
  const getMovie = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_END_POINT}/movie_details.json`, {
        params: {
          movie_id: id,
        },
      });
      setMovie(res.data.data.movie);
      setLoading(false);
    } catch (error) {
      throw new Error(`Failed to load movie description! ${error}`);
    }
  };

  const getSuggestion = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_END_POINT}/movie_suggestions.json`, {
        params: {
          movie_id: id,
        },
      });
      setSuggestion(res.data.data.movies);
      setLoading(false);
    } catch (error) {
      throw new Error(`Failed to load movie suggestion! ${error}`);
    }
  };

  const onClick = (event) => {
    console.log(event.target.dataset.suggestId);
    window.location.href = `${process.env.PUBLIC_URL}/movie/${event.target.dataset.suggestId}`;
  };

  useEffect(() => {
    getMovie();
    getSuggestion();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navigator />
          <main className={styles.main}>
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
            <section className={styles.suggestion}>
              <div className={styles.suggestion__title}>Related Movies</div>
              <ul>
                {suggestion.map((movie, i) => (
                  <li key={i}>
                    <p>
                      {movie.title.length > 20
                        ? `${movie.title.substring(0, 20)}...`
                        : movie.title}
                    </p>
                    <img
                      onClick={onClick}
                      src={movie.medium_cover_image}
                      data-suggest-id={movie.id}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default Detail;
