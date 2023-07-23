import { useEffect, useState } from 'react';

/**
 * Simple use local storage hook with support for ssr.
 * @param key Key to store.
 * @param initialValue Initial value.
 * @returns A tuple containing the value and a setter.
 */
export const useLocalStorage = (key: string, initialValue: string): [string, (value: string) => void] => {
  const isClient = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<string>(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        return item ?? initialValue;
      } catch (error) {
        /* empty */
      }
    }
    return initialValue;
  });

  const setValue = (value: string) => {
    if (isClient) {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, value);
      } catch (error) {
        /* empty */
      }
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ?? initialValue);
        } catch (error) {
          /* empty */
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, isClient]);

  return [storedValue, setValue];
};
