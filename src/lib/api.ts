// src/lib/api.ts
export type ApiOptions = {
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function apiGet<T>(
  path: string,
  opts: ApiOptions = {}
): Promise<T> {
  const url = new URL(path, BASE_URL);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(opts.headers ?? {})
    },
    signal: opts.signal,
    cache: "no-store"
  });
  if (!res.ok) {
    const msg = `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return (await res.json()) as T;
}
