import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import { useWindowSize } from '../../hooks/useWindowSize.js';

export default function PremiereCarousel({ premieres, favoriteIds, onToggleFavorite }) {
  const { width } = useWindowSize();
  const visible = width < 600 ? 1 : width < 900 ? 2 : 3;
  const maxStart = Math.max(0, premieres.length - visible);
  const [start, setStart] = useState(0);

  // If the window grows, keep the index inside the valid range.
  useEffect(() => {
    setStart((current) => Math.min(current, maxStart));
  }, [maxStart]);

  const slice = premieres.slice(start, start + visible);

  return (
    <div className="carousel">
      <button type="button" className="btn btn--icon" onClick={() => setStart(start - 1)} disabled={start === 0} aria-label="Anterior">
        ‹
      </button>
      <div className="carousel__track">
        {slice.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteIds.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
      <button type="button" className="btn btn--icon" onClick={() => setStart(start + 1)} disabled={start >= maxStart} aria-label="Siguiente">
        ›
      </button>
    </div>
  );
}
