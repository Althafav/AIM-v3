"use client";

import { useMemo, useState } from "react";
import AwardSlider from "./AwardSlider";

type Item = {
  category: { value: Array<{ name: string }> };
  // ...whatever else AwardSlider expects for each item
};

interface Props {
  items: Item[];
  /** which category index should be open on first render (default: 0) */
  defaultOpenIndex?: number;
}

export default function AwardAccordion({ items, defaultOpenIndex = 0 }: Props) {
  const grouped = useMemo(() => groupAwardsByCategory(items), [items]);
  const categories = Object.keys(grouped);

  const [openIndex, setOpenIndex] = useState<number | null>(
    categories.length ? Math.min(defaultOpenIndex, categories.length - 1) : null
  );

  return (
    <div className="w-full">
      <div
        role="region"
        aria-label="Awards by category"
        className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white"
      >
        {categories.map((category, idx) => {
          const isOpen = openIndex === idx;
          return (
            <section key={category} className="group">
              <h2 className="bg-primary">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${idx}`}
                  id={`accordion-trigger-${idx}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-white">
                    {category}
                  </span>

                  {/* caret icon */}
                  <svg
                    className={`h-5 w-5 text-white transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </h2>

              {/* animated panel */}
              <div
                id={`panel-${idx}`}
                role="region"
                aria-labelledby={`accordion-trigger-${idx}`}
                className={`px-5 overflow-hidden transition-[max-height,opacity] duration-300 ${
                  isOpen
                    ? "max-h-[1000px] opacity-100 py-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="">
                  <AwardSlider items={grouped[category]} />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- utils ---------- */
function groupAwardsByCategory(items: any[]) {
  const grouped: Record<string, any[]> = {};
  for (const item of items) {
    const categoryName =
      item?.elements.category?.value?.[0]?.name ?? "Uncategorized";
    (grouped[categoryName] ??= []).push(item);
  }
  return grouped;
}
