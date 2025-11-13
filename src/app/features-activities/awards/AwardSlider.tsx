"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  items: any[];
  options?: any;
  autoplayDelayMs?: number; // default 4000
}

export default function AwardSlider({
  items,
  options,
  autoplayDelayMs = 4000,
}: Props) {
  if (!items || items.length === 0) return null;

  const autoplay = useRef(
    Autoplay({
      delay: autoplayDelayMs,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, ...options },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
    });
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  return (
    <div className="relative w-full">
      {/* viewport */}
      <div
        className="overflow-hidden rounded-2xl border border-neutral-200"
        ref={emblaRef}
      >
        {/* container */}
        <div className="flex">
          {items.map((item: any, index: number) => {
            return (
              <div
                className="min-w-0 flex-[0_0_100%] p-4 "
                key={index}
                aria-roledescription="slide"
              >
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-neutral-900 tracking-tighter">
                        {item.elements.category.value[0]?.name}
                      </h3>
                      {item.elements.description.value && (
                        <p className="mt-2 text-sm text-neutral-600">
                          {item.elements.description.value}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-lg tracking-tight">
                        {item.elements.name.value}
                      </h4>
                      <h6 className="">{item.elements.companyname.value}</h6>
                      <h6 className="">{item.elements.country.value}</h6>
                    </div>
                  </div>

                  <div>
                    {item.elements.image.value && (
                      <img
                        src={item.elements.image.value[0]?.url}
                        alt={item.elements.name.value}
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* nav arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow hover:bg-white"
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
          <path d="M12.78 15.53a.75.75 0 01-1.06 0L6.97 10.78a.75.75 0 010-1.06l4.75-4.75a.75.75 0 111.06 1.06L8.56 10l4.22 4.22a.75.75 0 010 1.06z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow hover:bg-white"
        aria-label="Next slide"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
          <path d="M7.22 4.47a.75.75 0 011.06 0l4.75 4.75c.3.3.3.77 0 1.06l-4.75 4.75a.75.75 0 11-1.06-1.06L11.44 10 7.22 5.78a.75.75 0 010-1.06z" />
        </svg>
      </button>

      {/* dots */}
      <div className="mt-4 flex w-full items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === selectedIndex
                ? "bg-neutral-900"
                : "bg-neutral-300 hover:bg-neutral-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
