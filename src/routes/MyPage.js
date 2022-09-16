import { useEffect } from 'react';
import { useState } from 'react';
import Navigator from '../components/Navigator';
import Movie from '../components/Movie';
import MovieList from '../components/MovieList';
import styles from '../components/Movie.module.css';

function MyPage() {
  // 찜한 영화 목록 indexedDB에 저장 후 불러오기
  // 후기 적고 indexedDB에 저장 후 같이 불러오기
  // like 해제 기능
  // like 기능 위해 홈에서 하트 누르기 기능
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
    const gSet = new Set();
    for (const m of movieList) {
      for (const g of m.genres) {
        gSet.add(g);
      }
    }
    setTotalGenres([...gSet]);
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
