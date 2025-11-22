import Image from "next/image";
import BlogCard, { BlogCardProps } from "@/components/blog/BlogCard";

type BlogPostItem = Omit<BlogCardProps, "variant">;
type Socials = { instagram?: string; facebook?: string; tiktok?: string; email?: string };
type Article = { title: string; updatedAt: string; href?: string };

export default function AuthorProfile({
  name = "Sadith Collatupa",
  breadcrumbHome = { label: "Inicio", href: "/" },
  avatar, // { src, alt }
  socials = {},
  about = [],
  facts = [],
  articles = [],
  posts = [],
}: {
  name?: string;
  breadcrumbHome?: { label: string; href: string };
  avatar?: { src: string; alt?: string };
  socials?: Socials;
  about?: string[];
  facts?: string[];
  articles?: Article[];
  posts?: BlogPostItem[];
}) {
  const ABOUT =
    about.length
      ? about
      : [
          "Sadith Collatupa es una apasionada viajera peruana dedicada a inspirar a más personas a explorar la magia del Perú.",
          "Comparte su pasión a través del blog de Jisa Adventures con mirada cercana y femenina sobre el viaje.",
          "Cada artículo busca educar, inspirar y acompañar al viajero con información verificada y tips prácticos.",
        ];

  const FACTS =
    facts.length
      ? facts
      : [
          "💡 Más de 8 años viajando por Perú.",
          "✍️ Redactora en Jisa Adventures Blog.",
          "📷 +100 000 seguidores en Instagram.",
          "🧭 Especializada en Cusco, Machu Picchu, Ica y Arequipa.",
        ];

  const ARTICLES =
    articles.length
      ? articles
      : [
          { title: "MONTAÑA 7 COLORES: GUÍA DE VIAJES 2025", updatedAt: "28 Oct. 2025" },
          { title: "LA LAGUNA HUMANTAY: GUÍA DE VIAJE", updatedAt: "28 Oct. 2025" },
          { title: "LAS RUTAS DE MACHU PICCHU 2025", updatedAt: "28 Oct. 2025" },
          { title: "VALLE SAGRADO: GUÍA COMPLETA", updatedAt: "28 Oct. 2025" },
          { title: "QUÉ LLEVAR AL CAMINO INCA", updatedAt: "28 Oct. 2025" },
          { title: "MEJOR ÉPOCA PARA IR A CUSCO", updatedAt: "28 Oct. 2025" },
          { title: "MIRADORES DE LIMA IMPERDIBLES", updatedAt: "28 Oct. 2025" },
          { title: "AREQUIPA EN 2 DÍAS", updatedAt: "28 Oct. 2025" },
        ];

  return (
    <div className="bg-white text-[#181A1A] leading-relaxed">
      {/* BLOQUE 1: PERFIL */}
      <section className="bg-[#F6F9F9] px-5 py-16 md:py-24 mb-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between gap-10">
          <div className="max-w-[700px]">
            <small className="block text-sm text-gray-600 mb-2">
              <a href={breadcrumbHome.href} className="hover:underline">{breadcrumbHome.label}</a> / {name}
            </small>
            <h1 className="text-3xl font-extrabold mb-3 leading-snug">{name}</h1>
            <p className="text-sm text-gray-800 mb-4">
              Creadora de contenido y viajera peruana con más de 100 000 seguidores en Instagram.
              Comparte guías, historias y consejos para inspirar a quienes sueñan con recorrer el Perú.
            </p>
            <p className="text-sm text-gray-800 mb-4">
              {name.split(" ")[0]} forma parte del equipo de Jisa Adventures.{" "}
              <a href="#" className="text-[#1B9C9E] hover:text-[#00796b] font-medium">
                Conoce más sobre Jisa Adventures →
              </a>
            </p>

            <div className="flex gap-6 text-2xl mt-4">
              {socials.instagram && <a href={socials.instagram} aria-label="Instagram" className="hover:text-[#1B9C9E]">📸</a>}
              {socials.facebook && <a href={socials.facebook} aria-label="Facebook" className="hover:text-[#1B9C9E]">👍</a>}
              {socials.tiktok && <a href={socials.tiktok} aria-label="TikTok" className="hover:text-[#1B9C9E]">🎵</a>}
              {socials.email && <a href={`mailto:${socials.email}`} aria-label="Email" className="hover:text-[#1B9C9E]">✉️</a>}
            </div>
          </div>

          <div className="shrink-0">
            {avatar?.src ? (
              <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden bg-[#506363]">
                <Image src={avatar.src} alt={avatar.alt ?? name} fill className="object-cover" sizes="260px" priority />
              </div>
            ) : (
              <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] bg-[#506363] rounded-full flex items-center justify-center font-semibold">
                FOTO
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BLOQUE 2: BIO */}
      <section className="px-5 mb-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between gap-10">
          <div className="max-w-[700px]">
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Sobre {name}</h2>
            {ABOUT.map((p, i) => (
              <p key={i} className="text-sm text-gray-800 mb-4">{p}</p>
            ))}
          </div>

          <aside className="bg-[#F6F9F9] rounded-xl shadow-sm p-6 w-full max-w-[350px] text-sm text-gray-800">
            {FACTS.map((f, i) => (
              <p key={i} className={`flex items-center gap-2 ${i < FACTS.length - 1 ? "mb-6" : ""}`}>{f}</p>
            ))}
          </aside>
        </div>
      </section>

        {/* BLOQUE 3: ARTÍCULOS (grid de 4 SIEMPRE en desktop) */}
        <section className="px-5 pb-20">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-2xl font-bold mb-10 text-center">Artículos Publicados</h2>

                {/* Si pasas posts (para BlogCard), usamos cards; si no, caemos al listado simple (ARTICLES) */}
                {posts.length > 0 ? (
                <div className="grid grid-cols-12 gap-6">
                    {posts.map((p, i) => (
                    <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-4">
                        <BlogCard variant="sm" {...p} />
                    </div>
                    ))}
                </div>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {ARTICLES.map((a, i) => (
                    <a
                        key={i}
                        href={a.href ?? "#"}
                        className="rounded-xl border border-gray-200 hover:border-[#1B9C9E] hover:shadow-md transition p-5 block"
                    >
                        <h3 className="text-base font-bold text-[#181A1A] mb-1 line-clamp-2">{a.title}</h3>
                        <small className="text-sm text-gray-600">Actualizado en: {a.updatedAt}</small>
                    </a>
                    ))}
                </div>
                )}
            </div>
        </section>
    </div>
  );
}
