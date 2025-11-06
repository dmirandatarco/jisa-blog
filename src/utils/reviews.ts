export function parseTripadvisorDate(s?: string): string | undefined {
  if (!s) return undefined;
  const m = s.match(/Written\s+([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/i);
  if (!m) return undefined;
  const [, monStr, d, y] = m;
  const months: Record<string, string> = {
    january: "01", february: "02", march: "03", april: "04",
    may: "05", june: "06", july: "07", august: "08",
    september: "09", october: "10", november: "11", december: "12",
  };
  const mm = months[monStr.toLowerCase()];
  if (!mm) return undefined;
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

/** Extrae "YYYY-MM-DD" desde "2025-05-31 00:19:36" */
export function parseGoogleDate(s?: string): string | undefined {
  if (!s) return undefined;
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : undefined;
}

/** Título corto a partir del cuerpo (primera oración / 8-10 palabras) */
export function makeShortTitle(body?: string, author?: string): string {
  const text = String(body || "").replace(/\s+/g, " ").trim();
  if (!text) return `Review by ${author || "Guest"}`;
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  const words = firstSentence.split(" ").slice(0, 10).join(" ");
  return words.length < text.length ? `${words}…` : words;
}

/** Limpia y recorta cuerpo (evita scripts, controla longitud) */
export function cleanBody(body?: string, max = 700): string {
  const s = String(body || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** Mezcla TripAdvisor + Google -> array de reviews para Product JSON-LD */
export function buildProductReviews(
  tripadvisors: any[] = [],
  googles: any[] = [],
  limit = 12
) {
  const ta = tripadvisors.map((r) => ({
    author: r?.nombre || "TripAdvisor user",
    datePublished: parseTripadvisorDate(r?.fecha), // puede quedar undefined si no matchea
    name: makeShortTitle(r?.descripcion, r?.nombre),
    reviewBody: cleanBody(r?.descripcion),
    ratingValue: r?.estrellas ?? 5,
    _createdAt: r?.created_at, // para ordenar si no hay datePublished
  }));

  const g = googles.map((r) => ({
    author: r?.nombre || "Google user",
    datePublished: parseGoogleDate(r?.fecha),
    name: makeShortTitle(r?.descripcion, r?.nombre),
    reviewBody: cleanBody(r?.descripcion),
    ratingValue: r?.estrellas ?? 5,
    _createdAt: r?.created_at,
  }));

  // Ordena por fecha publicada; si no hay, usa created_at
  const sortByDate = (a: any, b: any) => {
    const da = a.datePublished || a._createdAt || "";
    const db = b.datePublished || b._createdAt || "";
    return String(db).localeCompare(String(da));
  };

  return [...ta, ...g].sort(sortByDate).slice(0, limit);
}

/** Calcula rating promedio y cantidad */
export function buildAggregateRating(items: Array<{ ratingValue: any }> = []) {
  const ratings = items
    .map((x) => Number(x?.ratingValue))
    .filter((n) => Number.isFinite(n) && n > 0);
  const reviewCount = ratings.length;
  if (!reviewCount) return undefined;
  const avg = ratings.reduce((a, b) => a + b, 0) / reviewCount;
  // Redondea a 1 decimal (opcional)
  const ratingValue = Math.round(avg * 10) / 10;
  return { ratingValue, reviewCount };
}
