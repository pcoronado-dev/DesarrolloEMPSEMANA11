// Controlled input: the text lives in the common ancestor (App),
// so Banner can clear it and both stay in sync.
export default function SearchBar({ value, onChange, isPending }) {
  return (
    <div className="searchbar">
      <input
        type="search"
        className="searchbar__input"
        placeholder="Buscar por título o género…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar película"
      />
      {isPending && <span className="searchbar__hint">Buscando…</span>}
    </div>
  );
}
