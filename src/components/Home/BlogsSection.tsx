"use client";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../UI/ButtonComponent";
import Section from "../UI/Section";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/modules/Helper";

export default function BlogsSection({
  heading,

  ctaname,
  ctalink,
}: any) {
  const [pageData, setPageData] = useState<any | null>(null);
  useEffect(() => {
    fetch("/api/blogs", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch global data");
        return res.json();
      })
      .then(setPageData)
      .catch(console.error);
  }, []);

  if (!pageData) return null;

  return (
    <Section>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          <ButtonComponent name={ctaname} link={ctalink} />
        </div>

        <div className="flex flex-wrap ">
          {pageData.articles_items.linkedItems
            ?.slice(0, 5)
            .sort(
              (a: any, b: any) =>
                new Date(b.system.lastModified).getTime() -
                new Date(a.system.lastModified).getTime()
            )
            ?.map((item: any, index: number) => {
              let widthClass = "w-full";
              if (index === 3) widthClass = "w-full lg:w-8/12";
              else widthClass = "w-full lg:w-4/12";
              return (
                <div key={item.system.id} className={`${widthClass} px-1 mb-8`}>
                  <Link
                    href={`/article/${slugify(item.elements.heading.value)}`}
                    className="block relative  rounded-lg overflow-hidden "
                  >
                    <span className="absolute z-10 inline-block bg-primary text-white text-xs uppercase px-2 py-1 top-4 left-4 rounded">
                      Latest
                    </span>
                    <div className="relative">
                      <Image
                        src={item.elements.image.value[0].url}
                        alt={item.elements.heading.value}
                        width={400}
                        height={300}
                        className=" object-cover h-[200px] w-full"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-md font-semibold mb-2">
                        {item.elements.heading.value}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.system.lastModified
                          ? new Date(
                              item.system.lastModified
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </Section>
  );
}
