"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Entity = "Business" | "Government" | "Investor" | "Project";

export default function MatchmakingClient({ pageData }: { pageData: any }) {
  // Entities & map (same logic as your original)
  const entities: Entity[] = ["Business", "Government", "Investor", "Project"];
  const codeMap: Record<Entity, string> = {
    Business: "B",
    Government: "G",
    Investor: "I",
    Project: "P",
  };

  const [selectedFrom, setSelectedFrom] = useState<Entity | "">("");
  const [selectedTo, setSelectedTo] = useState<Entity | "">("");

  const items: any[] = useMemo(
    () => pageData?.matchmakingitems?.linkedItems ?? [],
    [pageData]
  );

  const filteredItems = useMemo(() => {
    if (!selectedFrom && !selectedTo) return items;

    if (selectedFrom && selectedTo) {
      const desiredCode = `${codeMap[selectedFrom]}2${codeMap[selectedTo]}`;
      return items.filter((item: any) => {
        const raw = item?.elements.code?.value?.[0];
        const codeString =
          typeof raw === "string" ? raw : (raw as any)?.name ?? "";
        return codeString === desiredCode;
      });
    }

    return [];
  }, [items, selectedFrom, selectedTo]);

  return (
    <div className="py-10">
      {/* Filters */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col">
          <label
            htmlFor="fromSelect"
            className="mb-2 text-sm font-medium text-neutral-800"
          >
            Your Entity
          </label>
          <select
            id="fromSelect"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
            value={selectedFrom}
            onChange={(e) => {
              setSelectedFrom(e.target.value as Entity);
              setSelectedTo("");
            }}
          >
            <option value="">— select —</option>
            {entities.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="toSelect"
            className="mb-2 text-sm font-medium text-neutral-800"
          >
            Your Preferred Entity
          </label>
          <select
            id="toSelect"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
            value={selectedTo}
            onChange={(e) => setSelectedTo(e.target.value as Entity)}
            disabled={!selectedFrom}
          >
            <option value="">— select —</option>
            {entities.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="py-8">
        {filteredItems.length > 0 ? (
          <div className="space-y-8">
            {filteredItems.map((item: any) => (
              <article
                key={item?.system?.id ?? item?.elements?.name?.value}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="mb-2 text-2xl font-semibold text-neutral-900">
                  {item?.name?.value ?? item?.elements?.name?.value}
                </h3>

                <div
                  className="prose max-w-none text-neutral-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      item?.content?.value ??
                      item?.elements?.content?.value ??
                      "",
                  }}
                />

                {(item?.link?.value || item?.elements?.link?.value) && (
                  <div className="mt-5">
                    <Link
                      href={
                        (item?.link?.value ??
                          item?.elements?.link?.value) as string
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                      target={
                        (item?.isexternal?.value?.[0]?.name ??
                          item?.elements?.isexternal?.value?.[0]?.name) ===
                        "yes"
                          ? "_blank"
                          : "_self"
                      }
                    >
                      {item?.buttonname?.value ??
                        item?.elements?.buttonname?.value ??
                        "Learn more"}
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <path d="M7.22 4.47a.75.75 0 011.06 0l4.75 4.75c.3.3.3.77 0 1.06l-4.75 4.75a.75.75 0 11-1.06-1.06L11.44 10 7.22 5.78a.75.75 0 010-1.06z" />
                      </svg>
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : selectedFrom && selectedTo ? (
          <p className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-600">
            No items found for <strong>{selectedFrom}</strong> →{" "}
            <strong>{selectedTo}</strong>.
          </p>
        ) : (
          <p className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-600">
            Pick both <strong>Your Entity</strong> and{" "}
            <strong>Your Preferred Entity</strong> to filter, or leave blank to
            see all.
          </p>
        )}
      </div>
    </div>
  );
}
