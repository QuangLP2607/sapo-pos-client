import { useState, useEffect } from "react";

export interface UseDebouncedSearchResult<T> {
  results: T[];
  options: string[];
}

/**
 * Hook tìm kiếm với debounce.
 * @param query Chuỗi tìm kiếm
 * @param fetchFn Hàm fetch trả về Promise<T[]>
 * @param mapToOptions Hàm map dữ liệu sang string[] để hiển thị trong Combobox
 * @param delay Thời gian debounce (ms)
 */
export function useDebouncedSearch<T>(
  query: string,
  fetchFn: (query: string) => Promise<T[]>, // Bắt buộc
  mapToOptions: (items: T[]) => string[], // Bắt buộc
  delay = 300
): UseDebouncedSearchResult<T> {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<T[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  // ---------------- debounce query ----------------
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  // ---------------- fetch data ----------------
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        if (!debouncedQuery.trim()) {
          if (!cancelled) {
            setResults([]);
            setOptions([]);
          }
          return;
        }

        const data = await fetchFn(debouncedQuery);

        if (!cancelled) {
          setResults(data);
          setOptions(mapToOptions(data));
        }
      } catch (err) {
        console.error("useDebouncedSearch error:", err);
        if (!cancelled) {
          setResults([]);
          setOptions([]);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, fetchFn, mapToOptions]);

  return { results, options };
}
