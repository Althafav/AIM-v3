"use client";

import React, { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from 'embla-carousel-class-names'

type Item =
  | { category?: string; title?: string; embed?: string }
  | {
      category?: string;
      elements: { name?: { value?: string }; embedlink: { value: string } };
    };

function ytId(raw?: string | null) {
  if (!raw) return null;
  if (/^[\w-]{10,}$/.test(raw)) return raw;
  try {
    const u = new URL(raw);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const p = u.pathname.split("/");
    const i = p.findIndex((x) => x === "embed" || x === "shorts");
    if (i >= 0 && p[i + 1]) return p[i + 1];
  } catch {}
  return null;
}

function LiteYT({ id, title }: { id: string; title?: string }) {
  const [play, setPlay] = useState(false);
  if (play)
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );

  return (
    <button
      onClick={() => setPlay(true)}
      aria-label={title ? `Play: ${title}` : "Play video"}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl"
      type="button"
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title || "YouTube thumbnail"}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium shadow">
          ▶ Play
        </span>
      </div>
    </button>
  );
}

export default function YoutubeVideoCarousel({
  heading,
  subheading,
  ctaname,
  ctalink,
  items = [],
}: {
  heading?: string;
  subheading?: string;
  ctaname?: string;
  ctalink?: string;
  items: Item[];
}) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false, containScroll: "trimSnaps" },
    [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }), ClassNames()]
  );

  const videos = useMemo(
    () =>
      items
        .filter((m: any) => m?.category !== "Conference Participants")
        .map((m: any) => {
          const title = m?.title ?? m?.elements?.name?.value ?? "";
          const raw = m?.embed ?? m?.elements?.embedlink?.value ?? "";
          const id = ytId(raw);
          return id ? { id, title } : null;
        })
        .filter(Boolean)
        .slice(0, 20) as { id: string; title?: string }[],
    [items]
  );

  if (!videos.length) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto">
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

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {videos.map((v, i) => (
              <div
                key={`${v.id}-${i}`}
                className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <LiteYT id={v.id} title={v.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
