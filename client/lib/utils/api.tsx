import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosError from '../axiosError';
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

// Define a generic function for making HTTP requests
export default async function httpRequest<T>(
  method: AxiosRequestConfig['method'],
  url: string,
  data?: any,
  token?: string, // Optional token parameter
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    // Set the Authorization header if token is available
    if (token) {
      if (!config) config = {};
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response: AxiosResponse<T> = await axios.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
      request: response.request,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors

      axiosError(error)
      throw new Error(`Axios error: ${error.message}`);
    } else {
      // Handle non-Axios errors
      axiosError(error as AxiosError)
      throw new Error(`Error: ${error.message}`);
    }
  }
}
