"use client";

import React, { useEffect, useState } from "react";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Link from "next/link";
import { deliveryClient } from "@/modules/Globals";

export default function PostShowReportsClient({ pageData }: any) {
  const categories = pageData.items?.linkedItems ?? [];

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.system.id ?? ""
  );

  if (!pageData || categories.length === 0) {
    return null;
  }

  return (
    <div className="">
      {/* Head banner with dropdown */}
      <HeadBanner
        heading={pageData.banner_heading?.value || "Post Show Reports"}
      >
        <select
          className="border rounded-xl px-4 py-2 bg-white shadow-sm"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {pageData.items.linkedItems.map((item: any) => (
            <option key={item.system.id} value={item.system.id}>
              {item.elements.year.value}
            </option>
          ))}
        </select>
      </HeadBanner>

      {/* Reports section */}
      <div className="bg-white ">
        <div className="container mx-auto">
          {pageData.items.linkedItems.map((category: any) => (
            <div
              key={category.system.id}
              className={
                activeCategory === category.system.id ? "block" : "hidden"
              }
            >
              <div className="grid md:grid-cols-4 gap-6">
                {category.elements.items.linkedItems.map((report: any) => (
                  <Link
                    key={report.system.id}
                    href={`/forms/download?type=postshow-report&id=${report.system.id}`}
                    target="_blank"
                    className="relative group"
                  >
                    <div className="overflow-hidden rounded-3xl bg-white">
                      <img
                        src={report.elements.image.value[0]?.url}
                        alt={report.elements.image.value[0]?.description || ""}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-1/2 left-1/2 translate-y-1/2 -translate-x-1/2 bg-black/80 text-white rounded-full px-4 py-2 text-sm">
                      Download PDF
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
