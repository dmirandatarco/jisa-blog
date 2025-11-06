export async function apiFetch<T = any>({
  endpoint,
  method = "GET",
  body,
  baseUrl = process.env.NEXT_PUBLIC_API_URL, // ajusta a tu url
  headers = {},
}: {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  baseUrl?: string;
  headers?: Record<string, string>;
}): Promise<T> {
  const res = await fetch(`${baseUrl?.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}