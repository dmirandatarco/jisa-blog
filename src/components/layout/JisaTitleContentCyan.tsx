export default function JisaTitleContentCyan({
  contenido,
  className = "",
}: { contenido?: string; className?: string }) {
  if (!contenido) return null;
  return (
    <h2 className={`md:text-left text-center text-JisaCyan font-medium ${className}`}>
      {contenido}
    </h2>
  );
}
