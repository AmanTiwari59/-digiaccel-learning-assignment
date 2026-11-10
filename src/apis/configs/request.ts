import { getApiBaseUrl } from './getApiBaseUrl';

export interface IRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  apiPath: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number | undefined>;
}

/**
 * Core HTTP client utility wrapping native fetch.
 * Implements centralized query string serialization, JSON header management,
 * and unified error normalization.
 */
export async function request<T = any>({
  method = 'GET',
  apiPath,
  body,
  headers = {},
  params,
}: IRequestOptions): Promise<T> {
  const baseUrl = getApiBaseUrl();

  // Build query string if params are provided
  let url = `${baseUrl}${apiPath}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const config: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch {
      // Fallback to response status text
    }
    throw new Error(errorMessage);
  }

  // Handle empty 204 responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export default request;
