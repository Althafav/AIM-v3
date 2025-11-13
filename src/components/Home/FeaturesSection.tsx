"use client";

import React, { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../UI/ButtonComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";

type FeaturesSectionProps = {
  heading: string;
  items: any[];
};

export default function FeaturesSection({
  heading,
  items,
}: FeaturesSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi]);

  // Optional keyboard support (left/right arrows)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    <section className="features-section py-10 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Embla Carousel */}
        <div
          className="embla relative pb-8"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {items?.map((item: any) => {
                const imgSrc = item?.elements.image?.value?.[0]?.url ?? "";
                const title = item?.elements.name?.value ?? "";
                const btnLabel = item?.elements.buttonname?.value ?? "";
                const href = item?.elements.link?.value ?? "#";
                const htmlContent = item?.elements.content?.value ?? "";

                return (
                  <div
                    className="embla__slide min-w-0 flex-[0_0_100%] p-5"
                    key={item.system.id}
                  >
                    <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      {/* Text */}

                      <div className="order-2 md:order-1">
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
                          {heading}
                        </h1>
                        <h4 className="text-xl sm:text-2xl font-medium mb-3">
                          {title}
                        </h4>

                        <div
                          className="prose prose-neutral max-w-none mb-6"
                          dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />

                        {btnLabel && href && (
                          <ButtonComponent name={btnLabel} link={href} />
                        )}

                        {/* Custom Arrows */}
                        <div className="flex gap-3 shrink-0 mt-8">
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

                      {/* Image */}
                      <div className="order-1 md:order-2">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={title}
                            className="w-full h-72 md:h-96 object-cover rounded-2xl"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-72 md:h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
