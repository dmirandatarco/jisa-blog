export default function ParrafoContent({
  contenido,
  className = "",
}: { contenido?: string; className?: string }) {
  if (!contenido) return null;
  return (
    <div
      className={`md:text-left text-center font-light my-4 ${className}`}
      dangerouslySetInnerHTML={{ __html: contenido }}
    />
  );
}
