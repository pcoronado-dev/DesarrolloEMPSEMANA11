import { notify } from '../../utils/notify.js';

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const handleClick = () => {
    onToggleFavorite(movie.id);
    if (isFavorite) notify.info(`“${movie.title}” salió de tus favoritas`);
    else notify.success(`“${movie.title}” añadida a tus favoritas`);
  };

  return (
    <article className="card">
      <div
        className="card__poster"
        style={{ background: `linear-gradient(135deg, hsl(${movie.posterHue} 70% 45%), hsl(${(movie.posterHue + 60) % 360} 70% 25%))` }}
      >
        <span>{movie.title.charAt(0)}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{movie.title}</h3>
        <p className="card__meta">
          {movie.year} · {movie.durationLabel}
        </p>
        <p className="card__genres">{movie.genres.join(' · ')}</p>
        <div className="card__footer">
          <span className="card__rating">{movie.hasRating ? `⭐ ${movie.rating.toFixed(1)}` : 'Próximamente'}</span>
          <button
            type="button"
            className={`fav ${isFavorite ? 'fav--on' : ''}`}
            onClick={handleClick}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Quitar de favoritas' : 'Marcar como favorita'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
    </article>
  );
}
