const BASE = process.env.NEXT_PUBLIC_API_URL!;
if (!BASE) throw new Error("Falta NEXT_PUBLIC_API_URL en .env.local");

/**
 * apiPost — todas tus peticiones en POST (lectura/escritura) por BODY.
 * - Por defecto NO cachea.
 * - Si pasas `cacheSeconds`, en SERVER hace ISR (force-cache + revalidate).
 */
export async function apiPost<T>(
  endpoint: string,
  body?: unknown,
  opts?: { cacheSeconds?: number; tags?: string[] }
): Promise<T> {
  const cacheSeconds = opts?.cacheSeconds ?? 0;
  const tags = opts?.tags;

  const url = `${BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const isServer = typeof window === "undefined";
  const useCache = isServer && cacheSeconds > 0;

  const req: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body == null ? undefined : typeof body === "string" ? body : JSON.stringify(body),
    cache: useCache ? "force-cache" : "no-store",
    ...(useCache ? { next: { revalidate: cacheSeconds, tags } } : {}),
  };

  const res = await fetch(url, req);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const err = new Error(
      `API ${endpoint} -> ${res.status} ${
        isJson ? (data?.message || data?.error || res.statusText) : res.statusText
      }`
    ) as Error & { status?: number; payload?: any };
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data as T;
}
