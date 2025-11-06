type RowNumberProps = {
  col?: number;        // span en md+
  colSm?: number;      // span en sm
  colXs?: number;      // span en xs (mobile)
  className?: string;
  children: React.ReactNode;
};

function spanToClass(prefix: string, n?: number) {
  // n ∈ [1..12]; si no hay n, devolvemos vacío
  return n ? `${prefix}:col-span-${n}` : "";
}

export default function RowNumber({
  col = 4,
  colSm,
  colXs = 12,
  className = "",
  children,
}: RowNumberProps) {
  // whitelist de clases para Tailwind (no dinámicas al vuelo)
  const classes = [
    `mb-10 col-span-${Math.min(Math.max(colXs, 1), 12)}`, // xs
    spanToClass("sm", colSm),
    spanToClass("md", col),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
