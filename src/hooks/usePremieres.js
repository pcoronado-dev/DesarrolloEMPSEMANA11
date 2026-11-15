import { useCallback, useEffect, useState } from 'react';
import { RAW_PREMIERES } from '../data/rawMovies.js';
import { adaptMovies } from '../utils/movieAdapter.js';

// Simulates a network request. States: 'loading' | 'success' | 'error'.
export function usePremieres({ shouldFail = false, delay = 1800 } = {}) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: null, error: null });

    const timeoutId = setTimeout(() => {
      if (cancelled) return;
      if (shouldFail) {
        setState({
          status: 'error',
          data: null,
          error: new Error('El servidor de estrenos no respondió (503).')
        });
      } else {
        setState({ status: 'success', data: adaptMovies(RAW_PREMIERES), error: null });
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [shouldFail, delay, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}
