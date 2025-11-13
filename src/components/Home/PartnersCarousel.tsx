"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { BiWorld } from "react-icons/bi";
import ButtonComponent from "../UI/ButtonComponent";

export default function PartnersCarousel({ heading }: any) {
  const [pageData, setPageData] = useState<any | null>(null);
  useEffect(() => {
    fetch("/api/partners-2025", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch global data");
        return res.json();
      })
      .then(setPageData)
      .catch(console.error);
  }, []);

  const items: any[] = Array.isArray(pageData)
    ? pageData[0]?.Items
      ? pageData.flatMap((g: any) => g?.Items ?? [])
      : pageData
    : [];
  if (!pageData) return null;
  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          <ButtonComponent name="View all Partners" link="/our-partners" />
        </div>

        <Swiper
          modules={[Autoplay, A11y, Keyboard]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={2}
          spaceBetween={24}
          loop
          keyboard={{ enabled: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {items.map((m: any, index: number) => {
            var item: any = m;
            return (
              <SwiperSlide key={`partner-${index}`}>
                <div>
                  <div className="relative group overflow-hidden p-4 border border-primary rounded-lg bg-white text-center  flex justify-center flex-col items-center h-50">
                    {item.logo && (
                      <img
                        src={item.logo}
                        title={item.name}
                        alt={item.name}
                        width={290}
                        height={160}
                        className="mx-auto max-h-30 object-contain"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white">{item.name}</p>

                      <div className="flex gap-3 mt-3">
                        {item?.website && (
                          <Link
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 transition"
                          >
                            <BiWorld size={20} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
