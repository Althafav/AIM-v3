"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import ButtonComponent from "../UI/ButtonComponent";
import SplitText from "../UI/Animated/SplitText";

export default function HeroSection({
  bannerheading,
  datevenue,
  ctabuttons,
  bannerimage,
  bannervideosrc,
}: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];

      if (!title || !subtitle) return;

      // initial state
      gsap.set([title, subtitle, ...buttons], { opacity: 0, y: 60 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.8 },
      });

      tl.to(title, { opacity: 1, y: 0 })
        .to(subtitle, { opacity: 1, y: 0 }, "-=0.4")
        .to(buttons, { opacity: 1, y: 0, stagger: 0.15 }, "-=0.4");
    },
    { scope: sectionRef }
  );
  return (
    <div
      ref={sectionRef}
      className=" relative h-[600px] bg-black flex items-center overflow-hidden w-full"
    >
      <div className="absolute inset-0 z-0 ">
        <video
          width="100%"
          autoPlay
          loop
          className="brightness-50 h-full w-full object-cover object-top"
          playsInline
          muted
          poster={bannerimage}
          controls={false}
          preload="auto"
        >
          <source
            src={bannervideosrc}
            type="video/mp4"
            className=""
            width="100%"
          />
        </video>
      </div>
      <div className="container mx-auto">
        <div ref={titleRef}>
          <SplitText
            text={bannerheading}
            as="h1"
            className="text-white text-3xl sm:text-7xl max-w-3xl font-bold mb-4"
          />
        </div>
        <p ref={subtitleRef} className="text-white">
          {datevenue}
        </p>

        {ctabuttons && (
          <div ref={ctaRef} className="text-white mt-4">
            {ctabuttons.map((item: any) => {
              return (
                <ButtonComponent
                  variant="primary"
                  key={item.system.id}
                  name={item.elements.name.value}
                  link={item.elements.link.value}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
