import axios from 'axios';
import { useEffect, useState } from 'react';
import Navigator from '../components/Navigator';
import Movie from '../components/Movie';
import Loading from './Loading';
import styles from '../components/Movie.module.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageNums, setPageNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [movies, setMovies] = useState([]);
  const [totalGenres, setTotalGenres] = useState([]);
  const [sort, setSort] = useState('all');
  const [hidden, setHidden] = useState([]);

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
      console.log(res.data.data);
      const movieList = res.data.data.movies;
      setMovies(movieList);
      getGenres(movieList);
      setLoading(false);
    } catch (error) {
      throw new Error(`Failed to load movie list!${error}`);
    }
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
  }, [pageNum, pageNums]);

  const onChange = (event) => {
    event.preventDefault();
    setSort(event.target.value);

    const hiddens = [];
    movies.forEach((movie) => {
      hiddens.push(getHidden(movie.genres, event.target.value));
    });

    setHidden(hiddens);
  };

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
        <main className={styles.home}>
          <Navigator />
          <div className={styles.sort}>
            <select onChange={onChange} value={sort}>
              <option value="all">All</option>
              {totalGenres.map((g, i) => (
                <option value={g} key={i}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <section className={styles.movies}>
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
          <ul className={styles.pageNums}>
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
                  className={styles.pageNums_selected}
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
