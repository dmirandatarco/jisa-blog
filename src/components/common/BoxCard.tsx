export default function BoxCard({ title, color }: { title?: string; color?: string }) {
  return (
    <span
      className={[
        "px-4 py-1 rounded-md text-sm font-semibold text-white",
        color ? "" : "bg-JisaCyan",
      ].join(" ")}
      style={color ? { backgroundColor: color } : undefined}
    >
      {title}
    </span>
  );
}
