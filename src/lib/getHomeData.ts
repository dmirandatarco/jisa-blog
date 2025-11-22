import { cache } from "react";
import { apiPost } from "@/lib/api";

export const getHomeData = cache(async () => {
  const res = await apiPost<{ data: any }>(
    "/general-blog",
    { idiomaId: 1 },
    { cacheSeconds: 60, tags: ["home", "menu"] }
  ).then(r => r.data).catch(() => undefined);

  return res ?? {};
});