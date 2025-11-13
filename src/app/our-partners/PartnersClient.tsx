"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import ButtonComponent from "@/components/UI/ButtonComponent";

export default function PartnersClient({ categorized, categories }: any) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = useMemo(() => {
    if (!query) return categorized;

    const result: Record<string, any[]> = {};
    const q = query.toLowerCase();

    for (const cat of categories) {
      result[cat] = (categorized[cat] ?? []).filter((it: any) =>
        it.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [categorized, categories, query]);

  return (
    <>
      {/* ✅ SEARCH INPUT */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search partners…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
      </div>

      {/* ✅ CATEGORY + LIST */}
      {categories.map((category: any) => {
        const list = filtered[category] ?? [];
        if (!list.length) return null;

        return (
          <section key={category} className="mb-10">
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-neutral-900">
              {category}
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {list.map((item: any, index: number) => (
                <article
                  key={index}
                  onClick={() => setSelected(item)}
                  className="cursor-pointer rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-40 items-center justify-center p-4">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={250}
                        height={150}
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <div className="h-full w-full rounded-lg bg-neutral-100" />
                    )}
                  </div>
                  <p className="px-4 pb-4 text-center text-sm font-medium text-neutral-800">
                    {item.name}
                  </p>
                </article>
              ))}
            </div>

            <hr className="mt-8 border-neutral-200" />
          </section>
        );
      })}

      {/* ✅ POPUP MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              className="mb-4 block ml-auto text-neutral-500 hover:text-neutral-800"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="flex justify-center mb-4 max-w-44 mx-auto ">
              {selected.imageUrl ? (
                <Image
                  src={selected.imageUrl}
                  alt={selected.name}
                  width={280}
                  height={150}
                  className="object-contain"
                />
              ) : (
                <div className="h-32 w-full rounded-lg bg-neutral-100" />
              )}
            </div>

            {/* NAME */}
            <h3 className="text-center text-lg font-semibold text-neutral-900">
              {selected.name}
            </h3>

            {/* CATEGORIES */}
            <div className="mt-3 text-center">
              {selected.categories.map((c: any) => (
                <span
                  key={c}
                  className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 mr-2 mb-2"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* CONTENT (Scrolls inside modal) */}
            <div
              className="mt-6 prose max-w-none overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: selected.content }}
            />

            {selected.website && (
              <div className="mt-8">
                <ButtonComponent name="Visit Website" link={selected.website} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
