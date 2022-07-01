import { useEffect, useState } from 'react';
import Navigator from '../components/Navigator';
import Movie from '../components/Movie';
import styles from '../components/Movie.module.css';
import loadingStyles from './Loading.module.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalGenres, setTotalGenres] = useState([]);
  const [sort, setSort] = useState('all');
  const [hidden, setHidden] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
      )
    ).json();
    const movieList = json.data.movies;
    setMovies(movieList);
    getGenres(movieList);
    setLoading(false);
  };

  const getGenres = (movieList) => {
    const gSet = new Set();
    for (const m of movieList) {
      for (const g of m.genres) {
        gSet.add(g);
      }
    }
    setTotalGenres([...gSet]);
  };

  const getHidden = (genres, sort) => {
    if (sort === 'all') return false;
    if (genres.includes(sort)) return false;
    else return true;
  };

  useEffect(() => {
    getMovies();
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    setSort(event.target.value);

    const hiddens = [];
    movies.forEach((movie) => {
      hiddens.push(getHidden(movie.genres, event.target.value));
    });

    setHidden(hiddens);
  };

  return (
    <div>
      {loading ? (
        <div className={loadingStyles.loading}>
          <img src={require('../img/loading.gif')} alt="loading" />
          <p>Loading...</p>
        </div>
      ) : (
        <main>
          <Navigator />
          <select onChange={onChange} value={sort}>
            <option value="all">All</option>
            {totalGenres.map((g, i) => (
              <option value={g} key={i}>
                {g}
              </option>
            ))}
          </select>

          <section className={styles.home}>
            {movies.map((movie, i) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                hidden={hidden[i]}
              />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}

export default Home;
