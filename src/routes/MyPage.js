import { useEffect } from 'react';
import { useState } from 'react';
import Navigator from '../components/Navigator';
import Movie from '../components/Movie';
import MovieList from '../components/MovieList';
import styles from '../components/Movie.module.css';

function MyPage() {
  const LOCALSTORAGE_KEY = 'likedMovies';
  const [likedMovies, setLikedMovies] = useState([]);
  const [totalGenres, setTotalGenres] = useState([]);

  useEffect(() => {
    getLikedMovies();
  }, []);

  const getLikedMovies = () => {
    const movies = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    setLikedMovies(movies);
    getGenres(movies);
  };

  const getGenres = (movieList) => {
    if (!movieList) return;
    const gSet = new Set();
    for (const m of movieList) {
      for (const g of m.genres) {
        gSet.add(g);
      }
    }
    if (gSet) setTotalGenres([...gSet]);
  };

  return (
    <div className={styles.mypage}>
      <Navigator />
      <h1 className={styles.mypage__title}>My Favorite Movies</h1>
      <MovieList movies={likedMovies} genres={totalGenres} isLikedPage={true} />
    </div>
  );
}

export default MyPage;
