import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <section className={styles.movie}>
      <img src={coverImg} alt={title} />
      <div className={styles.movie__info}>
        <ul className={styles.movie__genres}>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <h2 className={styles.movie__title}>
          <Link className={styles.movie__link} to={`/movie/${id}`}>
            {title}
          </Link>
        </h2>
        <p className={styles.movie__summary}>
          {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
        </p>
      </div>
    </section>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
