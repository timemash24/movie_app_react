import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

function Movie(props) {
  return (
    <div style={props.hidden ? { display: 'none' } : null}>
      {
        <section className={styles.movie}>
          <Link className={styles.movie__link} to={`/movie/${props.id}`}>
            <img src={props.coverImg} alt={props.title} />
          </Link>
          <div className={styles.movie__info}>
            <ul className={styles.movie__genres}>
              {props.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <h2 className={styles.movie__title}>
              <Link className={styles.movie__link} to={`/movie/${props.id}`}>
                {props.title}
              </Link>
            </h2>
            <p className={styles.movie__summary}>
              {props.summary.length > 150
                ? `${props.summary.slice(0, 150)}...`
                : props.summary}
            </p>
          </div>
          <div className={styles.movie__like} data-movie-id={props.id}>
            {!props.liked ? (
              <i className="fa-regular fa-heart" onClick={props.onClick}></i>
            ) : (
              <i
                className="fa-solid fa-heart"
                onClick={props.onClick}
                style={{ color: 'indianred' }}
              ></i>
            )}
          </div>
        </section>
      }
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Movie;
