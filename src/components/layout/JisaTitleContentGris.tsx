export default function JisaTitleContentGris({
  contenido,
  className = "",
}: { contenido?: string; className?: string }) {
  if (!contenido) return null;
  return (
    <span className={`md:text-left text-center text-JisaCyan font-medium ${className}`}>
      {contenido}
    </span>
  );
}
