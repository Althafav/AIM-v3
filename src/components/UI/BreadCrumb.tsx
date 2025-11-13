"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadCrumb() {
  const pathname = usePathname();

  // Split pathname into breadcrumb parts
  const segments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "en" && segment !== "ar");

  // Build breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      name: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href,
      isLast: index === segments.length - 1,
    };
  });
  return (
    <nav className="mb-6 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-[#0A1E2D] font-medium">
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            <span className="text-gray-400">/</span>
            {crumb.isLast ? (
              <li className="text-gray-600 font-semibold">{crumb.name}</li>
            ) : (
              <li>
                <Link
                  href={crumb.href}
                  className="hover:text-[#0A1E2D] transition-colors"
                >
                  {crumb.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
