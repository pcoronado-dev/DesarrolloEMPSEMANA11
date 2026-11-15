import { useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header.jsx';
import Banner from './components/Banner/Banner.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import MovieList from './components/MovieList/MovieList.jsx';
import PremiereSection from './components/PremiereSection/PremiereSection.jsx';
import { RAW_MOVIES } from './data/rawMovies.js';
import { adaptMovies } from './utils/movieAdapter.js';
import { useDebounce } from './hooks/useDebounce.js';

// Adapted once, outside the component: the data never changes.
const MOVIES = adaptMovies(RAW_MOVIES);

export default function App() {
  // Shared state lives here (common ancestor of Header, Banner, SearchBar, lists).
  const [searchText, setSearchText] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const debouncedText = useDebounce(searchText, 350);
  const filter = debouncedText.trim().toLowerCase();

  const filteredMovies = useMemo(
    () =>
      MOVIES.filter(
        (movie) =>
          movie.title.toLowerCase().includes(filter) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(filter))
      ),
    [filter]
  );

  const toggleFavorite = (id) =>
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const clearFilter = () => setSearchText('');

  return (
    <>
      <Header favoritesCount={favoriteIds.length} />
      <main className="container">
        <Banner activeFilter={filter ? debouncedText.trim() : ''} resultsCount={filteredMovies.length} onClearFilter={clearFilter} />
        <SearchBar value={searchText} onChange={setSearchText} isPending={searchText !== debouncedText} />
        <PremiereSection favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
        <section className="section">
          <h2>En cartelera</h2>
          <MovieList movies={filteredMovies} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
        </section>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}
