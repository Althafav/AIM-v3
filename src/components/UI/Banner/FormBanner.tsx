import React from "react";

export default function FormBanner({
  aimlogolink,
  aimlogoSrc,
  heading,
  subheading,
  date,
}: any) {
  return (
    <div
      className="head-banner-wrapper bg-white"
      style={{
        backgroundImage: `
          url('/assets/imgs/aim-pattern-left.svg'),
          url('/assets/imgs/aim-pattern-right.svg')
        `,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "left center, right top",
        backgroundSize: "480px 360px, 680px 360px",
      }}
    >
      <div className="py-10 px-5">
        <div className="mb-4">
          <a href={aimlogolink ?? "#"} className="">
            <img className="w-28" src={aimlogoSrc} alt="" />
          </a>
        </div>
        <h1 className=" mb-3 text-3xl sm:text-5xl font-medium tracking-tighter leading-16">
          {heading}
        </h1>
        <div className="">
          <p className="inline-block text-gray-600">{date}</p>
        </div>
      </div>
    </div>
  );
}
