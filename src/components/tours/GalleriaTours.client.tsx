"use client";

import { useEffect, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

type GalImg = { ruta: string };
type WithSize = GalImg & { width: number; height: number };

export default function GalleriaTours({
  id,
  images = [],
}: {
  id: string;
  images: GalImg[];
}) {
  const [imagesWithSize, setImagesWithSize] = useState<WithSize[]>([]);

  useEffect(() => {
    void import("photoswipe/style.css");
    let mounted = true;

    const loadImageSizes = async () => {
      const results = await Promise.all(
        images.map(
          (image) =>
            new Promise<WithSize>((resolve) => {
              const img = new Image();
              img.src = image.ruta;
              img.onload = () => {
                resolve({
                  ...image,
                  width: img.naturalWidth || 1200,
                  height: img.naturalHeight || 800,
                });
              };
              img.onerror = () => {
                resolve({
                  ...image,
                  width: 1200,
                  height: 800,
                });
              };
            })
        )
      );
      if (mounted) setImagesWithSize(results);
    };

    loadImageSizes();
    return () => {
      mounted = false;
    };
  }, [images]);

  useEffect(() => {
    if (!imagesWithSize.length) return;

    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + id,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox?.destroy();
      // @ts-expect-error: liberación explícita
      lightbox = null;
    };
  }, [id, imagesWithSize]);

  if (!imagesWithSize.length) return null;

  return (
    <div
      id={id}
      className="pswp-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl gap-6 mx-auto py-20"
    >
      {imagesWithSize.map((image, index) => (
        <a
          key={`${id}-${index}`}
          href={image.ruta}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-all max-h-52"
        >
          {/* Usamos <img> normal porque PhotoSwipe lee el href/size; Next/Image no es necesario aquí */}
          <img src={image.ruta} alt="" className="w-full h-full object-cover" />
        </a>
      ))}
    </div>
  );
}
