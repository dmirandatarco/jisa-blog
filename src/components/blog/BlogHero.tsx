"use client";

import Image from "next/image";

type BlogHeroProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  altImageUrl: string;
};

export default function BlogHero({ title, subtitle, imageUrl, altImageUrl }: BlogHeroProps) {
  return (
    <section
      className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
                 h-[580px] md:h-[600px] sm:h-[420px] mb-12 overflow-hidden text-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={altImageUrl}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[1400px] h-full mx-auto mt-40
                      flex items-center justify-start px-[60px] md:px-[40px] sm:px-[20px]">
        <div className="text-white text-center md:text-left">
          <h1 className="text-[44px] md:text-[34px] sm:text-[24px] font-extrabold uppercase leading-tight tracking-wide mb-3">
            BLOG DE VIAJERO CON<br className="hidden sm:block" /> JISA ADVENTURE
          </h1>
          <p className="text-[18px] md:text-[16px] sm:text-[14px] text-gray-200 max-w-[600px] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
