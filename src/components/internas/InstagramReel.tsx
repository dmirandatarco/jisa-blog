"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

type InstagramReelProps = {
  url: string;        // permalink del reel, ej: "https://www.instagram.com/reel/XXXXXXXXX/"
};

export default function InstagramReel({ url }: InstagramReelProps) {
  useEffect(() => {
    // Si el script aún no existe, lo creamos
    if (!document.getElementById("instagram-embed-script")) {
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.id = "instagram-embed-script";
      document.body.appendChild(s);
      s.onload = () => {
        window.instgrm?.Embeds?.process();
      };
    } else {
      // Si ya existe, solo reprocesamos los embeds nuevos
      window.instgrm?.Embeds?.process();
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ maxWidth: 400, width: "100%" }}
      />
    </div>
  );
}
