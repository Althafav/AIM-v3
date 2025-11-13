"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ButtonComponent from "@/components/UI/ButtonComponent";

type Props = { items: any[] };

export default function SideForumSlider({ items = [] }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(items.length <= 1);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params.navigation &&
      typeof swiperRef.current.params.navigation !== "boolean"
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const updateEdgeFlags = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (!items.length) return null;

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={32}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateEdgeFlags(swiper);
        }}
        onSlideChange={updateEdgeFlags}
        className="pb-2!"
      >
        {items.map((sf: any, idx: number) => {
          const logos = sf?.elements.entityitems?.linkedItems ?? [];
          const imgs = sf?.elements.images?.value ?? [];

          return (
            <SwiperSlide key={idx}>
              <div className="rounded-3xl">
                <div className="mb-4 flex flex-col items-start justify-between gap-3 ">
                  <h2 className="text-2xl max-w-3xl font-semibold  tracking-tight text-primary">
                    {sf?.elements.sessionname?.value}
                  </h2>
                  <ButtonComponent
                    link={`/side-forums/${sf?.elements.slug?.value}`}
                    name="Read More"
                    className="rounded-full bg-neutral-900 text-white px-5 py-2 hover:-translate-y-0.5 hover:shadow transition"
                  />
                </div>

                {/* Content: 3 columns as per reference */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6">
                  {/* Left: Single logo (or list) */}
                  <div className="col-span-12 md:col-span-3">
                    <div className="space-y-4">
                      {(logos.length ? logos : [null])
                        .slice(0, 3)
                        .map((e: any, i: number) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-neutral-200 p-4"
                          >
                            <Link
                              href={e?.elements.websitelink?.value || "#"}
                              target="_blank"
                            >
                              <img
                                src={e?.elements.logo?.value?.[0]?.url}
                                alt={e?.elements.name?.value || "Entity"}
                                className="mx-auto h-24 w-auto object-contain"
                              />
                            </Link>
                            <p className="mt-3 text-xs font-medium text-neutral-700">
                              {e?.elements.name?.value || "EXITS MENA"}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Center: Large image */}
                  <div className="col-span-12 md:col-span-6">
                    <div className="overflow-hidden rounded-3xl">
                      <img
                        src={imgs?.[0]?.url}
                        alt={imgs?.[0]?.name || "Main"}
                        className="aspect-16/10 w-full object-cover rounded-3xl"
                      />
                    </div>
                  </div>

                  {/* Right: Two stacked images */}
                  <div className="col-span-12 md:col-span-3">
                    <div className="grid grid-rows-2 gap-4 sm:gap-6">
                      <div className="overflow-hidden rounded-3xl">
                        <img
                          src={imgs?.[1]?.url}
                          alt={imgs?.[1]?.name || "Small Top"}
                          className="aspect-16/10 w-full object-cover rounded-3xl"
                        />
                      </div>
                      <div className="overflow-hidden rounded-3xl">
                        <img
                          src={imgs?.[2]?.url}
                          alt={imgs?.[2]?.name || "Small Bottom"}
                          className="aspect-16/10 w-full object-cover rounded-3xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Bottom-left arrows like the reference */}
      <div className="mt-6 flex items-center gap-3">
        <button
          ref={prevRef}
          disabled={isBeginning}
          aria-label="Previous slide"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow transition hover:scale-[1.02] ${
            isBeginning ? "opacity-30 cursor-not-allowed hover:scale-100" : ""
          }`}
        >
          <FaArrowLeft className="h-4 w-4" />
        </button>

        <button
          ref={nextRef}
          disabled={isEnd}
          aria-label="Next slide"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow transition hover:scale-[1.02] ${
            isEnd ? "opacity-30 cursor-not-allowed hover:scale-100" : ""
          }`}
        >
          <FaArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
