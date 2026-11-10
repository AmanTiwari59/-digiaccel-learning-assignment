/**
 * Returns the base URL for API requests.
 * Uses relative path in browser and handles SSR origin fallback.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '';
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export default getApiBaseUrl;
