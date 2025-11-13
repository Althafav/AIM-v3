import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Section from "../UI/Section";
import ButtonComponent from "../UI/ButtonComponent";

export default function PillarSection({
  heading,
  pillaritems,
  ctabuttonname,
  ctabuttonlink,
}: any) {
  return (
    <Section className="pillar-section-wrapper">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h2 className="text-3xl sm:text-5xl tracking-tighter">{heading}</h2>
          <div>
            <ButtonComponent name={ctabuttonname} link={ctabuttonlink} />
          </div>
        </div>

        <div className="flex gap-10 md:gap-20 flex-wrap pb-4">
          {pillaritems.map((item: any, index: number) => (
            <div
              key={index}
              className="relative min-w-[280px] md:min-w-0 md:flex-1"
            >
              <h4 className="mb-5 text-2xl md:text-3xl tracking-tighter">
                {item.elements.name.value}
              </h4>

              <div className="text-gray-500 mb-4 pr-10 md:pr-20">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.elements.content.value,
                  }}
                />
              </div>

              {item.elements.link.value && (
                <Link
                  href={item.elements.link.value}
                  className="text-gray-500 flex gap-2 items-center"
                >
                  <span>Read more</span>
                  <FaArrowRight />
                </Link>
              )}

              {index < 2 && (
                <div className="hidden md:block absolute -right-5 top-0 h-full w-0.5 bg-linear-to-b from-gray-500 to-gray-200 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
