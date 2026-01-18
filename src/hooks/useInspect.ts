import { useState } from "react";

const API_BASE = "https://api.gaia.fantasymaps.org";

interface InspectParams {
  world: string;
  obj: string;
  perspective: string;
  context: string;
}

interface UseInspectResult {
  data: Record<string, unknown> | null;
  error: string | null;
  isLoading: boolean;
  query: { obj: string; perspective: string; context: string } | null;
  inspect: (params: InspectParams) => Promise<void>;
  reset: () => void;
}

export function useInspect(): UseInspectResult {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState<{ obj: string; perspective: string; context: string } | null>(null);

  const inspect = async ({ world, obj, perspective, context }: InspectParams) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setQuery({ obj, perspective, context });

    try {
      const params = new URLSearchParams({
        obj,
        perspective,
        context,
      });

      const response = await fetch(`${API_BASE}/${encodeURIComponent(world)}/inspect?${params}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail?.[0]?.msg || 
          errorData?.detail || 
          `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setQuery(null);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setQuery(null);
  };

  return { data, error, isLoading, query, inspect, reset };
}
