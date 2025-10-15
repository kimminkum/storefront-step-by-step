export type ApiErrorShape = { error: string; status: number };

type GetOpts = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
};

export function buildUrl(path: string, query?: GetOpts["query"]) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const url = new URL(
    path.replace(/^\//, ""),
    base.endsWith("/") ? base : base + "/"
  );
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === "") continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function apiGet<T>(path: string, opts: GetOpts = {}): Promise<T> {
  const url = path.startsWith("http") ? path : buildUrl(path, opts.query);
  const res = await fetch(url, {
    method: "GET",
    signal: opts.signal,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers ?? {})
    }
    // 필요 시 next: { revalidate: 10 } 등 옵션 가능(서버에서 호출할 때)
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = (await res.json()) as { error?: string; message?: string };
      msg = j.error || j.message || msg;
    } catch {}
    const err: ApiErrorShape = { error: msg, status: res.status };
    throw Object.assign(new Error(msg), err);
  }
  return (await res.json()) as T;
}
