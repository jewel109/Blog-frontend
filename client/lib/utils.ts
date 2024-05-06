import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import axios from 'axios';

// Type for consistent response structure
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Function to handle Axios requests with proper error handling and optional token

export async function makeAxiosRequest<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  headers?: Record<string, string>,
  includeToken = false
): Promise<T> {
  try {
    const token = includeToken ? localStorage.getItem('token') : null;

    const axiosInstance = axios.create({
      // Base URL can be set here if needed
      baseURL: 'http://localhost:9000',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    const response = await axiosInstance({
      method,
      url,
      data,
    });

    // Check for successful response (status code in 2xx range)

    if (response.status >= 200 && response.status < 300) {
      return response.data as T; // Type casting for guaranteed T
    }

    console.log(response)

    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    // Handle errors gracefully (log, display user-friendly message)
    console.error('Axios request error:', error);
    throw new Error('An error occurred during the request.'); // Re-throw for component handling
  }
}

