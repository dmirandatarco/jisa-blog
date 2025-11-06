import { getHomeData } from "@/lib/getHomeData";

export default async function Head() {
  let firstHref: string | undefined;
  try {
    const dataGeneral = await getHomeData();
    const slider = dataGeneral?.slider;
    const detalles = Array.isArray(slider?.detalles) ? slider.detalles : [];
    firstHref = detalles?.[0]?.enlace;
  } catch {}

  return (
    <>
      {firstHref && (
        <>
          <link rel="preconnect" href="https://sistema.jisaadventure.com" crossOrigin="" />
          <link rel="dns-prefetch" href="https://sistema.jisaadventure.com" />
          <link rel="preload" as="image" href={firstHref} imagesizes="100vw" />
        </>
      )}
    </>
  );
}