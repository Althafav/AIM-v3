// components/packages/BannerWithCountdown.tsx
"use client";

import React, { useEffect, useState } from "react";

export default function BannerWithCountdown({
  imageUrl,
  heading,
  eventDate,
}: {
  imageUrl: string;
  heading: string;
  eventDate: string; // ISO
}) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(eventDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0)
        return setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  return (
    <section className="relative">
      <img
        src={imageUrl}
        alt=""
        className="h-[340px] w-full object-cover object-bottom"
      />
      {/* <div className="absolute inset-0 bg-black/40" /> */}
      <div className="absolute inset-0">
        <div className="container mx-auto h-full px-4 flex flex-col items-center justify-center">
          <h1 className="text-center text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
            {heading}
          </h1>

          <div className="mt-6 w-full max-w-3xl">
            <ul className="grid grid-cols-4 gap-3 text-center">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((i) => (
                <li key={i.label} className="">
                  <div className="text-3xl font-bold text-white">{i.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-gray-200">
                    {i.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
