"use client";

import Image from "next/image";
import Link from "next/link";

type BlogHeroProps = {
  title: string;
  fecha: string;
  imageUrl: string;
  altImageUrl: string;
};

export default function Hero({ title, fecha, imageUrl, altImageUrl }: BlogHeroProps) {
  return (
    <section className="w-full flex flex-col items-center text-center mb-12">
      <div className="max-w-3xl px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        <div className="flex items-center justify-center gap-3">
          {/* <- relative es clave para <Image fill /> */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-amber-100">
            <Image
              src="/imagen/sadith-collatupa.jpg"
              alt="Sadith Collatupa"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col text-left">
            <p className="text-[18px]">
              Escrito por{" "}
              <Link href="/sobre-sadith-collatupa" className="font-semibold text-emerald-700">
                Sadith Collatupa
              </Link>
            </p>
            <span className="text-sm text-gray-600">Actualizado en: {fecha}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
