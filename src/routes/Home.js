import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import Navigator from '../components/Navigator';

function Home() {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageNums, setPageNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [movies, setMovies] = useState([]);
  const [totalGenres, setTotalGenres] = useState([]);

  const getGenres = (movieList) => {
    const gSet = new Set();
    for (const m of movieList) {
      for (const g of m.genres) {
        gSet.add(g);
      }
    }
    setTotalGenres([...gSet]);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://yts.mx/api/v2/list_movies.json', {
          params: {
            minimum_rating: 7,
            sort_by: 'download_count',
            page: pageNum,
            limit: 30,
          },
        });

        const movieList = res.data.data.movies;
        setMovies(movieList);
        getGenres(movieList);
        // getLiked();
        setLoading(false);
      } catch (error) {
        throw new Error(`Failed to load movie list!${error}`);
      }
    };
    getMovies();
  }, [pageNum, pageNums]);

  const handlePageNumBtn = (event) => {
    setPageNum(event.target.value);
  };

  const handleNextBtn = (event) => {
    event.preventDefault();
    if (pageNum <= 100) {
      if (pageNum >= pageNums[9]) {
        const newPageNums = pageNums.map((n) => n + 10);
        setPageNums(newPageNums);
      }
      setPageNum(pageNum + 1);
    }
  };

  const handlePrevBtn = (event) => {
    event.preventDefault();
    if (pageNum !== 1) {
      if (pageNum <= pageNums[0]) {
        const newPageNums = pageNums.map((n) => n - 10);
        setPageNums(newPageNums);
      }
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main className="home">
          <Navigator />
          <MovieList movies={movies} genres={totalGenres} isLikedPage={false} />
          <ul className="pageNums">
            <li>
              <i onClick={handlePrevBtn} className="fa-solid fa-angle-left"></i>
            </li>
            {pageNums.map((n, i) =>
              n !== pageNum ? (
                <li key={`pageNum${i}`} onClick={handlePageNumBtn} value={n}>
                  {n}
                </li>
              ) : (
                <li
                  key={`pageNum${i}`}
                  className="pageNums_selected"
                  onClick={handlePageNumBtn}
                  value={n}
                >
                  {n}
                </li>
              )
            )}
            <li>
              <i
                onClick={handleNextBtn}
                className="fa-solid fa-angle-right"
              ></i>
            </li>
          </ul>
        </main>
      )}
    </div>
  );
}

export default Home;
