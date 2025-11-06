import Link from "next/link";
import { Fragment } from "react";

type Crumb = { href?: string; label: string; current?: boolean };

export default function Breadcrumbs({
  items = [],
  className = "",
}: {
  items?: Crumb[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {items.map((it, i) => (
          <Fragment key={`${it.href ?? it.label}-${i}`}>
            {i > 0 && <span className="mx-2">/</span>}
            <li className="truncate max-w-full">
              {it.current ? (
                <span className="font-medium text-JisaCyan" aria-current="page">
                  {it.label}
                </span>
              ) : it.href ? (
                <Link href={it.href} className="hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span>{it.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
