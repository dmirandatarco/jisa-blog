export function buildWppLink(phone: string, text?: string) {
  const base = "https://wa.me/";
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `${base}${phone}${q}`;
}
