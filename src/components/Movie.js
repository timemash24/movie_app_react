import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Movie(props) {
  return (
    <div style={props.hidden ? { display: 'none' } : null}>
      {
        <section className="movie">
          <Link className="movie__link" to={`/movie/${props.id}`}>
            <img src={props.coverImg} alt={props.title} />
          </Link>
          <div className="movie__info">
            <ul className="movie__genres">
              {props.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <h2 className="movie__title">
              <Link className="movie__link" to={`/movie/${props.id}`}>
                {props.title.length > 30
                  ? `${props.title.substring(0, 30)}...`
                  : props.title}
              </Link>
            </h2>
            <p className="movie__summary">
              {props.summary.length > 150
                ? `${props.summary.slice(0, 150)}...`
                : props.summary}
            </p>
          </div>
          <div className="movie__like" data-movie-id={props.id}>
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
