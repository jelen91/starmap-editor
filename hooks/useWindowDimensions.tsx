import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState<{
    width: number 
    height: number
  }>({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); 
  return windowSize;
}
