import MovieCard from '../MovieCard/MovieCard.jsx';
import { useWindowSize } from '../../hooks/useWindowSize.js';

function columnsFor(width) {
  if (width < 600) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;
  return 4;
}

export default function MovieList({ movies, favoriteIds, onToggleFavorite }) {
  const { width } = useWindowSize();
  const columns = columnsFor(width);

  if (movies.length === 0) {
    return <p className="empty">No hay películas que coincidan con tu búsqueda.</p>;
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
