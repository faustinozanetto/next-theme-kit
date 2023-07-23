import { useEffect, useState } from 'react';

/**
 * Simple use local storage hook with support for ssr.
 * @param key Key to store.
 * @param initialValue Initial value.
 * @returns A tuple containing the value and a setter.
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const isClient = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
      } catch (error) {
        /* empty */
      }
    }
    return initialValue;
  });

  const setValue = (value: T) => {
    if (isClient) {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
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
          const newValue = JSON.parse(e.newValue ?? '') as T;
          setStoredValue(newValue);
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
