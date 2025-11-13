"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import ButtonComponent from "../UI/ButtonComponent";

type Speaker = {
  FirstName?: string;
  LastName?: string;
  Designation?: string;
  Company?: string;
  Image?: string;
  Linkedin?: string;
  Facebook?: string;
  Instagram?: string;
  HighLevel?: boolean;
};

export default function SpeakersCarousel({
  heading,
  ctaname,
  ctalink,
  showHighLevel,
}: {
  heading?: string;
  ctaname?: string;
  ctalink?: string;
  showHighLevel?: boolean;
}) {
  const [pageData, setPageData] = useState<Speaker[] | null>(null);

  useEffect(() => {
    fetch("/api/speakers-2025", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject("Fetch error")))
      .then(setPageData)
      .catch(console.error);
  }, []);

  const speakers = useMemo(() => {
    if (!pageData) return [];
    return pageData
      .filter((s) => (showHighLevel ? s.HighLevel : !s.HighLevel))
      .slice(0, 40);
  }, [pageData, showHighLevel]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!speakers.length) return null;

  return (
    <section className="">
      <div className="container mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            {heading}
          </h2>
          <div className="flex items-center gap-3">
            {ctalink && <ButtonComponent name={ctaname} link={ctalink} />}
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {speakers.map((item, i) => {
              const hasImage = item?.Image && item.Image.trim() !== "";
              return (
                <div
                  key={`${item.FirstName || "speaker"}-${
                    item.LastName || i
                  }-${i}`}
                  className="min-w-0 shrink-0 basis-1/2 sm:basis-1/3 lg:basis-1/5"
                >
                  <div className="relative group h-80 w-full overflow-hidden rounded-xl bg-white shadow-md">
                    {hasImage ? (
                      <img
                        src={item.Image as string}
                        alt={item?.FirstName || "Speaker"}
                        className="h-full w-full aspect-square object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-2 text-center opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                      <p className="text-lg font-semibold text-white">
                        {item?.FirstName} {item?.LastName}
                      </p>
                      {item?.Designation && (
                        <p className="mt-1 text-sm text-gray-200">
                          {item.Designation}
                        </p>
                      )}
                      {item?.Company && (
                        <p className="mt-1 text-sm text-gray-200">
                          {item.Company}
                        </p>
                      )}

                      <div className="mt-3 flex gap-3">
                        {item?.Linkedin && (
                          <Link
                            href={item.Linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white transition hover:text-blue-400"
                          >
                            <FaLinkedin size={20} />
                          </Link>
                        )}
                        {item?.Facebook && (
                          <Link
                            href={item.Facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white transition hover:text-blue-500"
                          >
                            <FaFacebook size={20} />
                          </Link>
                        )}
                        {item?.Instagram && (
                          <Link
                            href={item.Instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white transition hover:text-pink-400"
                          >
                            <FaInstagram size={20} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black  hover:text-white transition"
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black  hover:text-white transition"
            aria-label="Next"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
