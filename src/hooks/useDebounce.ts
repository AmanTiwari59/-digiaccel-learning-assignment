import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value updates (e.g. search input).
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds (defaults to 300ms)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
