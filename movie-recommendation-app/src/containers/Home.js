import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { fetchMovies, searchMovies, fetchGenres } from '../services/api';
import './Home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        let response;

        if (query) {
          response = await searchMovies(query, page);
        } else {
          response = await fetchMovies(page, selectedGenre);
        }

        const data = response.data;
        if (data && data.results) {
          setMovies(data.results);
        } else {
          console.error('Unexpected API response:', data);
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };

    getMovies();
  }, [page, query, selectedGenre]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    getGenres();
  }, []);

  return (
    <div className="home">
      <div className='search'>
        <SearchBar onSearch={setQuery} className="search-bar" />
        <Filters
          genres={genres}
          onGenreChange={(e) => setSelectedGenre(e.target.value)}
          selectedGenre={selectedGenre}
          className="filters"
        />
      </div>
      <div className="movie-list">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} className="movie-card" />)}
      </div>
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} className="pagination" />
    </div>
  );
};

export default Home;