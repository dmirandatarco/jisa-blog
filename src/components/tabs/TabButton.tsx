"use client";

import clsx from "clsx";

export default function TabButton({
  id,
  label,
  icon: Icon,
  isActive,
  activeColor,
  onClick,
}: {
  id: string;
  label: string;
  icon: (props: any) => JSX.Element;
  isActive: boolean;
  activeColor: string; // tailwind class
  onClick: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors",
        isActive
          ? clsx(activeColor, "text-white border-transparent")
          : "bg-white text-JisaGris/80 border-JisaGris/20 hover:bg-gray-50"
      )}
      aria-pressed={isActive}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
    </button>
  );
}
