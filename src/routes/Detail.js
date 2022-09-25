import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Navigator from '../components/Navigator';

function Detail() {
  const API_END_POINT = 'https://yts.mx/api/v2';
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const { id } = useParams();

  const onClick = (event) => {
    // console.log(event.target.dataset.suggestId);
    window.location.href = `${process.env.PUBLIC_URL}/movie/${event.target.dataset.suggestId}`;
  };

  useEffect(() => {
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

    getMovie();
    getSuggestion();
  }, [id]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navigator />
          <main className="main">
            <section className="details">
              <img
                className="details__img"
                src={movie.large_cover_image}
                alt={movie.title}
              />
              <div className="details__info">
                <h1 className="details__title">{movie.title_long}</h1>
                <ul className="details__genres">
                  {movie.genres.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
                <ul className="details__more">
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
                <p className="details__desc">{movie.description_full}</p>
              </div>
            </section>
            <section className="suggestion">
              <div className="suggestion__title">Related Movies</div>
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
                      alt={movie.title}
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
