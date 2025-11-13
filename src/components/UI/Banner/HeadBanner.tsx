import React from "react";

import BreadCrumb from "../BreadCrumb";

export default function HeadBanner({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading?: string;
  children?: React.ReactNode;
}) {
  return (
    <header
      className="relative bg-white py-10 text-[#0A1E2D] overflow-hidden"
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
      <div className="container mx-auto ">
        {/* Breadcrumb */}
        <BreadCrumb />

        {/* Heading */}
        <h1 className="text-4xl max-w-4xl sm:text-5xl font-bold mb-2 leading-tight tracking-tighter">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg sm:text-xl text-gray-700 tracking-tight max-w-4xl">
            {subheading}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
