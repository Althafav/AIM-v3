import React from "react";
import Section from "../UI/Section";
import { FaArrowRight } from "react-icons/fa";
import SplitText from "../UI/Animated/SplitText";
import Link from "next/link";

export default function TargetAudientsSection({ heading, items }: any) {
  return (
    <Section className="target-audients-section bg-white">
      <div className="container mx-auto flex justify-center flex-col">
        {/* <h2 className="text-3xl sm:text-5xl tracking-tighter text-center mb-10">
          {heading}
        </h2> */}

        <SplitText
          text={heading}
          as="h1"
          className="text-2xl sm:text-5xl tracking-tighter text-center mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          {items.map((item: any) => {
            return (
              <Link href={item.elements.link.value} key={item.system.id} className="group cursor-pointer shadow p-5 rounded-2xl hover:shadow-lg duration-300">
                <div className="flex gap-2 items-center">
                  <h4 className="text-lg font-medium transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                    {item.elements.name.value}
                  </h4>
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <div
                  className="text-md text-gray-500"
                  dangerouslySetInnerHTML={{ __html: item.elements.content.value }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
