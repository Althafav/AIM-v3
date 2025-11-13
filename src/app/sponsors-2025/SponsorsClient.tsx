"use client";
import ButtonComponent from "@/components/UI/ButtonComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function SponsorsClient({ items }: any) {
  const [selected, setSelected] = useState<any | null>(null);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item: any, index: number) => {
          return (
            <article
              key={index}
              onClick={() => setSelected(item)}
              className="cursor-pointer rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center p-4">
                <Image
                  src={item.elements.logo.value[0]?.url}
                  alt={item.elements.name.value}
                  width={250}
                  height={150}
                  className="h-full w-auto object-contain"
                />
              </div>
              <p className="px-4 pb-4 text-center text-sm font-medium text-neutral-800">
                {item.elements.name.value}
              </p>
            </article>
          );
        })}
      </div>

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
              {selected.elements.logo.value[0]?.url ? (
                <Image
                  src={selected.elements.logo.value[0]?.url}
                  alt={selected.elements.name.value}
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
              {selected.elements.name.value}
            </h3>

            {/* CONTENT (Scrolls inside modal) */}
            <div
              className="mt-6 prose max-w-none overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: selected.elements.content.value,
              }}
            />

            {selected.elements.website.value && (
              <div className="mt-8">
                <ButtonComponent
                  name="Visit Website"
                  link={selected.elements.website.value}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
