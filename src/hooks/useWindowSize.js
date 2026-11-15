import { useEffect, useState } from 'react';

const read = () => ({ width: window.innerWidth, height: window.innerHeight });

export function useWindowSize() {
  const [size, setSize] = useState(read);

  useEffect(() => {
    const handleResize = () => setSize(read());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
