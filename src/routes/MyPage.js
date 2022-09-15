import { useEffect } from 'react';
import { useState } from 'react';
import Navigator from '../components/Navigator';
import Movie from '../components/Movie';

function MyPage() {
  // 찜한 영화 목록 indexedDB에 저장 후 불러오기
  // 후기 적고 indexedDB에 저장 후 같이 불러오기
  // like 해제 기능
  // like 기능 위해 홈에서 하트 누르기 기능
  const LOCALSTORAGE_KEY = 'likedMovies';
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    getLikedMovies();
  }, []);

  const getLikedMovies = () => {
    const movies = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    setLikedMovies(movies);
  };

  return (
    <div>
      <Navigator />
      <section>
        {likedMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
            hidden={false}
            liked={true}
          />
        ))}
      </section>
    </div>
  );
}

export default MyPage;
