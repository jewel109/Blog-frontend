import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

// interface ApiResponse<T> {
//   data: T;
// }

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

function useApi<T>(
  config: AxiosRequestConfig,
) {
  const [apiData, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiFetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(config);
      setData(response.data as T);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiFetchData();

  }, [config]); // Update on config changes

  return { apiData, error, isLoading, apiFetchData };
}

export default useApi;

