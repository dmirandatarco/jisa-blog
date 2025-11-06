type GridNumberProps = {
  col?: number;              // columnas desktop
  colSm?: number;            // opcional: columnas en sm
  colMd?: number;            // opcional: columnas en md
  gap?: number | string;     // gap tailwind (p.e. "gap-6") no; usamos style
  className?: string;
  children: React.ReactNode;
};

export default function GridNumber({
  col = 12,
  colSm,
  colMd,
  gap,
  className = "",
  children,
}: GridNumberProps) {
  // usamos CSS Grid inline para evitar clases dinámicas
  // y mantenemos utilidades tailwind para padding/margins si quieres
  const style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
    gap: typeof gap === "number" ? `${gap}px` : undefined,
  };

  return (
    <div className={`grid ${className}`} style={style}>
      {children}
    </div>
  );
}
