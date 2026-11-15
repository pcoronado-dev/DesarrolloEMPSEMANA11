export default function Banner({ activeFilter, resultsCount, onClearFilter }) {
  if (!activeFilter) {
    return (
      <section className="banner">
        <h2>Bienvenido a la cartelera</h2>
        <p>Busca una película o marca tus favoritas con la estrella.</p>
      </section>
    );
  }

  return (
    <section className="banner banner--filtered">
      <p>
        Filtro activo: <strong>“{activeFilter}”</strong> · {resultsCount}{' '}
        {resultsCount === 1 ? 'resultado' : 'resultados'}
      </p>
      <button type="button" className="btn" onClick={onClearFilter}>
        Limpiar filtro
      </button>
    </section>
  );
}
