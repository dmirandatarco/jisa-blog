export default function JisaTitleContentVerde({
  contenido,
  className = "",
}: { contenido?: string; className?: string }) {
  if (!contenido) return null;
  return (
    <span className={`md:text-left text-center text-JisaVerde font-medium ${className}`}>
      {contenido}
    </span>
  );
}
