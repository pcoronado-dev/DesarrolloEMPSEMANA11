// The header only receives a number, never the favorites list.
export default function Header({ favoritesCount }) {
  return (
    <header className="header">
      <h1 className="header__title">🎬 Cartelera</h1>
      <span className="badge" aria-label={`Favoritas: ${favoritesCount}`}>
        ★ Favoritas: {favoritesCount}
      </span>
    </header>
  );
}
