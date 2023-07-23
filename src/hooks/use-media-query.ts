import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const isClient = typeof window !== 'undefined';
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (!isClient) return;

    const mediaQueryList = window.matchMedia(query);
    const updateMatches = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Set the initial value
    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', updateMatches);

    // eslint-disable-next-line consistent-return
    return () => {
      // Clean up the event listener when the component unmounts
      mediaQueryList.removeEventListener('change', updateMatches);
    };
  }, [query, isClient]);

  return matches;
};
