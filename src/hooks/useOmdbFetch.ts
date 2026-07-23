import { useEffect, useState } from 'react';
import { OMDB_API_KEY } from '../constants';

interface OmdbFetchState<T> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
}

function useOmdbFetch<T>(url: string | null): OmdbFetchState<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(undefined);
    setError(null);

    if (!url) return;

    if (!OMDB_API_KEY) {
      setError("Oops! Something went wrong. Please try again later.");
      return;
    }

    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Something went wrong while connecting to the API");
      }
      setLoading(false);
    })();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useOmdbFetch;
