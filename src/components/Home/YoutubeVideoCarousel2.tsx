"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type YoutubeVideoCarouselProps = {
  heading?: string;
  subheading?: string;
  ctaname?: string;
  ctalink?: string;
  items: any[];
};

export default function YoutubeVideoCarousel2({
  heading,
  subheading,
  ctaname,
  ctalink,
  items,
}: YoutubeVideoCarouselProps) {
  if (!items?.length) return null;

  // Embla with ClassNames plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center", // center active slide
      slidesToScroll: 1,
    },
    [
      ClassNames({
        snapped: "is-snapped", // active (snapped) slides
        inView: "is-in-view", // slides in view
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {heading}
              </h2>
            )}
            {subheading && <p className="text-neutral-600">{subheading}</p>}
          </div>
          {ctalink && (
            <a
              href={ctalink}
              className="rounded-full bg-black px-4 py-2 text-white hover:opacity-90"
            >
              {ctaname || "View all"}
            </a>
          )}
        </div>

        {/* Embla Carousel */}
        <div className="embla">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {items.map((item: any, index: number) => (
                <div
                  key={item.system.id ?? index}
                  className={`
                    embla__slide youtube__slide
                    flex-[0_0_100%]
                    sm:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]
                    min-w-0
                  `}
                >
                  <div className="youtube-frame w-full">
                    <iframe
                      src={`${item.elements.embedlink.value}?autoplay=1&mute=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="youtube-iframe w-full aspect-video rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={scrollPrev}
              className="custom-prev w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="custom-next w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
              aria-label="Next slide"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
