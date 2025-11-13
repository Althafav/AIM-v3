"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ButtonComponent from "../UI/ButtonComponent";

export default function TestimonialCarousel({
  heading,
  items,
  ctaname,
  ctalink,
}: any) {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          {ctalink && <ButtonComponent name={ctaname} link={ctalink} />}
        </div>

        <Swiper
          modules={[Autoplay, A11y, Keyboard]}
          centeredSlides
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1}
          spaceBetween={24}
          loop
          keyboard={{ enabled: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {items
            ?.filter((m: any) => m.category !== "Conference Participants")
            .slice(0, 20)
            .map((item: any, index: number) => (
              <SwiperSlide key={`partner-${index}`}>
                <div className="bg-slate-200 backdrop-blur-md border border-white/20 rounded-2xl  h-full p-6 flex flex-col items-start text-center">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white/30 shadow-md">
                    <Image
                      src={
                        item.elements.image.value[0]?.url || "/placeholder.png"
                      }
                      alt={item.elements.name.value}
                      title={item.elements.name.value}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name + Designation */}
                  <h3 className="text-lg font-semibold mb-1">
                    {item.elements.name.value}
                  </h3>
                  <p className="text-sm text-gray-800 mb-3">
                    {item.elements.designation.value}
                  </p>

                  {/* Content */}
                  <div
                    className="text-sm text-gray-800 text-left line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: item.elements.content.value,
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
