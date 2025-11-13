// app/knowledge-hub/KnowledgeHubClient.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import PageLoader from "@/components/globals/PageLoader";
import { FaYoutube } from "react-icons/fa";
import ShareButton from "@/components/UI/ShareButton";
import { FiSearch } from "react-icons/fi";
import { slugify } from "@/modules/Helper";
import Image from "next/image";

type Filter = "all" | "whitepaper" | "policypaper";

export default function KnowledgeHubClient({ pageData }: { pageData: any }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  if (!pageData) {
    return null;
  }

  // Expecting the same structure you used previously (with .value arrays)
  const whitePapers: any[] = pageData.whitepaperitems?.linkedItems ?? [];
  const policyPapers: any[] = pageData.policypaperitems?.linkedItems ?? [];
  const allItems: any[] = useMemo(
    () => [...whitePapers, ...policyPapers],
    [whitePapers, policyPapers]
  );

  const byCategory = useMemo(() => {
    if (filter === "whitepaper") return whitePapers;
    if (filter === "policypaper") return policyPapers;
    return allItems;
  }, [filter, whitePapers, policyPapers, allItems]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return byCategory;

    return byCategory.filter((item: any) => {
      const heading = item?.elements.heading?.value ?? "";
      const content = item?.elements.content?.value ?? "";
      const text = `${heading} ${stripHtml(content)}`.toLowerCase();
      return text.includes(term);
    });
  }, [byCategory, searchTerm]);

  return (
    <div className="">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-black rounded-3xl mb-10">
          <div className="px-6 py-7 md:px-10 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left: Heading + Subheading */}
              <div className="max-w-2xl">
                <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                  {pageData.bannerheading.value}
                </h1>

                <div
                  className="text-white/80 tracking-tight leading-snug mb-4"
                  dangerouslySetInnerHTML={{
                    __html: pageData.bannerdescription.value,
                  }}
                />
              </div>

              {/* Right: Search + Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4 w-full md:w-auto">
                {/* Actions */}
                <div className="flex items-center gap-3 justify-end">
                  <ShareButton />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between flex-wrap gap-5">
              {/* Search */}
              <div
                className="relative w-full sm:w-80"
                aria-label="Search articles"
              >
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <FiSearch size={18} className="text-gray-500" />
                </span>
                <input
                  id="q"
                  name="q"
                  type="text"
                  placeholder="Search papers…"
                  defaultValue={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  suppressHydrationWarning
                  className="w-full rounded-full bg-[#2e2e2e] text-white placeholder:text-gray-500
                             pl-9 pr-3 py-2.5 outline-none ring-white/10"
                />
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center gap-2">
                  <FilterPill
                    label="All"
                    active={filter === "all"}
                    onClick={() => setFilter("all")}
                  />
                  <FilterPill
                    label="White Papers"
                    active={filter === "whitepaper"}
                    onClick={() => setFilter("whitepaper")}
                  />
                  <FilterPill
                    label="Policy Papers"
                    active={filter === "policypaper"}
                    onClick={() => setFilter("policypaper")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 will-change-transform">
            {filteredItems.map((item: any) => (
              <article
                key={item.system.id}
                className="col-span-12 sm:col-span-6 lg:col-span-3 group rounded-xl overflow-hidden border border-gray-200 bg-white transform-gpu"
              >
                <Link
                  href={`/knowledge-hub/${item.elements.slug.value}`}
                  className="block"
                >
                  <div className="aspect-video relative overflow-hidden">
                    {item.elements.image ? (
                      <Image
                        src={item.elements.image.value[0]?.url}
                        alt={item.elements.heading.value}
                        fill
                        loading="lazy"
                        quality={75}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100" />
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold leading-snug tracking-tight text-gray-900 line-clamp-2">
                      {item.elements.heading.value}
                    </h2>

                    <p className="mt-2 text-xs text-neutral-500">
                      {item?.system?.lastModified
                        ? new Date(item.system.lastModified).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="min-h-[30vh] grid place-items-center">
            <p className="text-sm text-neutral-500">No papers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full px-4 py-2 text-sm transition-colors border " +
        (active
          ? "bg-primary text-white border-primary"
          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50")
      }
    >
      {label}
    </button>
  );
}

function stripHtml(html: string): string {
  if (!html) return "";
  if (typeof window === "undefined") {
    // server-safe fallback
    return html.replace(/<[^>]*>/g, " ");
  }
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
