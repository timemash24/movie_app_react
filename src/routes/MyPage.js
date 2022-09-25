import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Navigator from '../components/Navigator';

function MyPage() {
  const LOCALSTORAGE_KEY = 'likedMovies';
  const [likedMovies, setLikedMovies] = useState([]);
  const [totalGenres, setTotalGenres] = useState([]);

  useEffect(() => {
    const getLikedMovies = () => {
      const movies = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
      setLikedMovies(movies);
      getGenres(movies);
    };
    getLikedMovies();
  }, []);

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
    <div className="mypage">
      <Navigator />
      <h1 className="mypage__title">My Favorite Movies</h1>
      <MovieList movies={likedMovies} genres={totalGenres} isLikedPage={true} />
    </div>
  );
}

export default MyPage;
