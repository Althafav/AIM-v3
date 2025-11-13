import React from "react";
import Section from "../UI/Section";
import CTABlock from "../UI/Blocks/CTABlock";


export default function ThemeSection({
  themetag,
  themeline1,
  themeline2,
}: any) {
  return (
    <Section className="theme-section-wrapper bg-white">
      <div className="container mx-auto">
        <div className="">
          <p className="bg-primary text-white px-4 py-2 inline-block mb-5 text-sm sm:text-md">
            {themetag}
          </p>

          <div className="max-w-5xl mb-8">
            <h4 className="theme-gradient-text text-3xl text-justify sm:text-5xl tracking-tighter">
              {themeline1} <br /> {themeline2}
            </h4>
          </div>


          <CTABlock heading="Meet you at AIM – Where opportunities and connections await!" ctabuttonname="aim 2026" ctabuttonlink="/2026"/>
        </div>
      </div>
    </Section>
  );
}
