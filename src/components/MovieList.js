import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import styles from '../components/Movie.module.css';

function MovieList({ movies, genres, isLikedPage }) {
  const LOCALSTORAGE_KEY = 'likedMovies';
  const [sort, setSort] = useState('all');
  const [hidden, setHidden] = useState([]);
  const [liked, setLiked] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    getLikedMovies();
    getLiked();
  }, []);

  const getLikedMovies = () => {
    const likedMovies = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    setLikedMovies([...likedMovies]);
  };

  const getHidden = (genres, sort) => {
    if (sort === 'all') return false;
    if (genres.includes(sort)) return false;
    else return true;
  };

  const getLiked = () => {
    const likedMovies = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    setLikedMovies([...likedMovies]);

    if (likedMovies) {
      const liked = likedMovies.map((movie) => movie.id);
      setLiked([...liked]);

      console.log(liked);
    }
  };

  const onChange = (event) => {
    // event.preventDefault();
    const curSort = event.target.value;
    setSort(curSort);

    const hiddens = [];
    const movieList = isLikedPage ? likedMovies : movies;
    movieList.forEach((movie) => {
      if (curSort !== 'all' && !movie.genres.includes(curSort))
        hiddens.push(movie.id);
      //   hiddens.push(getHidden(movie.genres, event.target.value));
    });
    console.log(hiddens);
    setHidden(hiddens);
  };

  const handleLikeBtn = (_, movie) => {
    const likedMovies = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (likedMovies) {
      const newLikedMovies = likedMovies.filter(
        (likedMovie) => likedMovie.id !== movie.id
      );
      if (newLikedMovies.length === likedMovies.length) {
        localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify([...newLikedMovies, movie])
        );
      } else {
        localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify([...newLikedMovies])
        );
      }
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([movie]));
    }
    getLiked();
  };

  return (
    <div>
      <div className={styles.sort}>
        <select onChange={onChange} value={sort}>
          <option value="all">All</option>
          {genres.map((g, i) => (
            <option value={g} key={i}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <section className={styles.movies}>
        {isLikedPage
          ? likedMovies.map((movie, i) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                hidden={hidden.includes(movie.id)}
                liked={liked.includes(movie.id)}
                onClick={(_) => handleLikeBtn(_, movie)}
              />
            ))
          : movies.map((movie, i) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                hidden={hidden[i]}
                liked={liked.includes(movie.id)}
                onClick={(_) => handleLikeBtn(_, movie)}
              />
            ))}
      </section>
    </div>
  );
}

export default MovieList;
