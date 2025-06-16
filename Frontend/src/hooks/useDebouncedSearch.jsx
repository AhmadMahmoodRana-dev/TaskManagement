import { useEffect, useState } from "react";

export function useDebouncedSearch(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup if value changes before timeout
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
