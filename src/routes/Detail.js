import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.large_cover_image} alt={movie.title} />
          <h1>{movie.title_long}</h1>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <ul>
            <li>{movie.language.toUpperCase()}</li>
            <li>{movie.rating}</li>
            <li>{movie.runtime} min</li>
          </ul>
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
