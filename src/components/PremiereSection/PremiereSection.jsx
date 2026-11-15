import { useState } from 'react';
import { usePremieres } from '../../hooks/usePremieres.js';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton.jsx';
import PremiereCarousel from '../PremiereCarousel/PremiereCarousel.jsx';

export default function PremiereSection({ favoriteIds, onToggleFavorite }) {
  const [simulateError, setSimulateError] = useState(false);
  const { status, data, error, retry } = usePremieres({ shouldFail: simulateError });

  return (
    <section className="section">
      <div className="section__head">
        <h2>Estrenos</h2>
        <label className="check">
          <input type="checkbox" checked={simulateError} onChange={(e) => setSimulateError(e.target.checked)} />
          Simular error del servidor
        </label>
      </div>

      {status === 'loading' && <LoadingSkeleton />}

      {status === 'error' && (
        <div className="error" role="alert">
          <p><strong>No pudimos cargar los estrenos.</strong></p>
          <p>{error.message} Revisa tu conexión o inténtalo nuevamente.</p>
          <button type="button" className="btn" onClick={retry}>Reintentar</button>
        </div>
      )}

      {status === 'success' && (
        <PremiereCarousel premieres={data} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
      )}
    </section>
  );
}
