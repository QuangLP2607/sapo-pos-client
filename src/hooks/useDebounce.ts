import { useState, useEffect, useRef } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const queryCache: Record<string, unknown[]> = {};

export function useDebouncedSearch<T>(
  query: string,
  fetchFn: (query: string) => Promise<T[]>,
  mapToOptions: (items: T[]) => string[] = (items) =>
    items.map((item) => String(item)),
  delay = 300
) {
  const [results, setResults] = useState<T[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, delay);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      setResults([]);
      setOptions([]);
      return;
    }

    // ===== 1. PREFIX CACHE =====
    const prefixKey = Object.keys(queryCache).find((key) => q.startsWith(key));
    if (prefixKey && queryCache[prefixKey]) {
      const cached = queryCache[prefixKey] as T[];
      setResults(cached);
      setOptions(mapToOptions(cached));
    }

    // ===== 2. FULL CACHE =====
    if (queryCache[q]) {
      const cached = queryCache[q] as T[];
      setResults(cached);
      setOptions(mapToOptions(cached));
      return;
    }

    let cancel = false;
    const currentId = ++requestIdRef.current;

    setLoading(true);

    fetchFn(q)
      .then((data) => {
        if (cancel || currentId !== requestIdRef.current) return;

        queryCache[q] = data;
        setResults(data);
        setOptions(mapToOptions(data));
      })
      .finally(() => {
        if (!cancel && currentId === requestIdRef.current) {
          setLoading(false);
        }
      });

    return () => {
      cancel = true;
    };
  }, [debouncedQuery, fetchFn, mapToOptions]);

  return { results, options, loading };
}
