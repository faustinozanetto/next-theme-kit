import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    setMatches(mediaQuery.matches);

    // Clean up the event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [query]);

  return matches;
};
