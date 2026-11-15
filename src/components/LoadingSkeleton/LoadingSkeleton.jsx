import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useWindowSize } from '../../hooks/useWindowSize.js';

export default function LoadingSkeleton() {
  const { width } = useWindowSize();
  const count = width < 600 ? 1 : width < 900 ? 2 : 3;

  return (
    <div className="carousel__track" role="status" aria-label="Cargando estrenos">
      {Array.from({ length: count }, (_, index) => (
        <div className="card" key={index}>
          <Skeleton height={160} />
          <div className="card__body">
            <Skeleton height={20} width="80%" />
            <Skeleton height={14} width="50%" />
            <Skeleton height={14} width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}
