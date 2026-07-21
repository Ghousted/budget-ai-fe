/**
 * Low-level HTTP client for the Budget AI API (`budget-ai-api`, FastAPI).
 *
 * Base URL is resolved in this order:
 *   1. `EXPO_PUBLIC_API_URL` env var (full URL incl. `/api/v1`) — set in `.env`.
 *   2. Web: the host the app is served from, on the API port.
 *   3. Native dev: the Metro dev-server IP (`Constants.expoConfig.hostUri`), so
 *      a phone on the same Wi-Fi reaches your machine — `localhost` won't work
 *      from a device.
 *   4. Fallback: `http://localhost:8080/api/v1`.
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_PORT = 8080;
const API_PREFIX = '/api/v1';

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

function resolveBaseUrl(): string {
  // 1. Explicit override (inlined at build time — must use static dot notation).
  const override = process.env.EXPO_PUBLIC_API_URL;
  if (override) return stripTrailingSlash(override);

  // 2. Web preview: same hostname, API port.
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.location?.hostname) {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:${API_PORT}${API_PREFIX}`;
  }

  // 3. Native dev: derive the LAN IP Metro is served on (e.g. "192.168.1.37:8081").
  const hostUri = Constants.expoConfig?.hostUri ?? '';
  const host = hostUri.split(':')[0];
  if (host) return `http://${host}:${API_PORT}${API_PREFIX}`;

  // 4. Last resort.
  return `http://localhost:${API_PORT}${API_PREFIX}`;
}

export const API_BASE_URL = resolveBaseUrl();

/** Thrown for any non-2xx response. `body` holds the parsed error payload. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// --- Auth token -----------------------------------------------------------
// Kept in-memory (design phase). `AuthProvider` calls setAuthToken on sign-in.

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

// --- Request helper -------------------------------------------------------

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
};

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const base = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  if (!query) return base;
  const params = Object.entries(query)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return params ? `${base}?${params}` : base;
}

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, query, signal } = opts;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    // Network failure (server down, wrong host, offline).
    throw new ApiError(0, `Network request failed. Is the API running at ${API_BASE_URL}?`, err);
  }

  const parsed = await parseBody(res);

  if (!res.ok) {
    const detail =
      parsed && typeof parsed === 'object' && 'detail' in parsed
        ? String((parsed as { detail: unknown }).detail)
        : res.statusText || 'Request failed';
    throw new ApiError(res.status, detail, parsed);
  }

  return parsed as T;
}
