import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import React from "react";

export default function PromotionBannerCarousel({ promoBanners }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );
  return (
    <div
      className="overflow-hidden"
      ref={emblaRef}
      aria-roledescription="carousel"
    >
      <div className="flex touch-pan-y -mx-2">
        {promoBanners.map((item: any, index: number) => (
          <div
            key={index}
            className="
                px-2
                shrink-0
                 flex-[0_0_calc(100%)]
         sm:flex-[0_0_calc(100%/1)]
              "
          >
            <Link href={item.elements.link.value}>
              <img
                src={item.elements.image.value[0]?.url}
                alt={`Slide ${index + 1}`}
                className="rounded w-full object-contain"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
