"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Section from "../UI/Section";
import ButtonComponent from "../UI/ButtonComponent";
import Image from "next/image";
import Link from "next/link";
import { BiWorld } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function SponsorsCarousel({
  heading,
  ctaname,
  ctalink,
}: any) {
  const [pageData, setPageData] = useState<any | null>(null);
  useEffect(() => {
    fetch("/api/sponsors-2025", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch global data");
        return res.json();
      })
      .then(setPageData)
      .catch(console.error);
  }, []);

  if (!pageData) return null;
  return (
    <Section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          <ButtonComponent name={ctaname} link={ctalink} />
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
          {pageData.map((item: any) => (
            <SwiperSlide key={item.system.id}>
              <div className="relative group overflow-hidden p-4 border border-primary rounded-lg bg-white text-center  flex justify-center flex-col items-center h-50">
                <Image
                  src={item.elements.logo.value[0]?.url}
                  title={item.elements.name.value}
                  alt={item.elements.name.value}
                  width={290}
                  height={160}
                  className="mx-auto max-h-30 object-contain"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white">{item.elements.name.value}</p>

                  <div className="flex gap-3 mt-3">
                    {item?.elements.website && (
                      <Link
                        href={item.elements.website.value}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
