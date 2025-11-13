"use client";

import React, { useRef } from "react";
import ButtonComponent from "../UI/ButtonComponent";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FeaturesSection({ heading, items }: any) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="features-section py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {heading}
          </h1>

          {/* Custom Arrows */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="custom-prev w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
            >
              <FaArrowLeft />
            </button>
            <button
              ref={nextRef}
              className="custom-next w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, A11y, Keyboard]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          onInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRef.current;

            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="pb-10!"
        >
          {items?.map((item: any) => {
            const imgSrc = item?.elements.image?.value?.[0]?.url ?? "";
            const title = item?.elements.name?.value ?? "";
            const btnLabel = item?.elements.buttonname?.value ?? "";
            const href = item?.elements.link?.value ?? "#";

            return (
              <SwiperSlide key={item.system.id}>
                <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Text */}
                  <div className="order-2 md:order-1">
                    <h4 className="text-xl sm:text-2xl font-medium mb-3">
                      {title}
                    </h4>

                    <div
                      className="prose prose-neutral max-w-none mb-6"
                      dangerouslySetInnerHTML={{ __html: item.elements.content.value }}
                    />

                    {btnLabel && href && (
                      <ButtonComponent name={btnLabel} link={href} />
                    )}
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
