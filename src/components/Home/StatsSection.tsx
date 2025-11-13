import React from "react";
import Section from "../UI/Section";
import ButtonComponent from "../UI/ButtonComponent";

export default function StatsSection({
  statsheading,
  statscontent,
  statsitems,
  downloadreportname,
  downloadreportlink,
}: any) {
  return (
    <Section className="stats-component-wrapper ">
      <div className="container mx-auto ">
        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:py-10 sm:px-20">
          <div className="grid grid-cols-1 gap-5  sm:grid-cols-2 mb-10">
            <h2 className="text-2xl sm:text-4xl max-w-md">{statsheading}</h2>
            <div>
              <div
                className="prose text-md sm:text-lg mb-3"
                dangerouslySetInnerHTML={{ __html: statscontent }}
              />

              <div>
                <ButtonComponent
                  name="Download 2025 PSR"
                  link={downloadreportlink}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {statsitems.map((item: any) => {
              return (
                <div className="" key={item.system.id}>
                  <p>{item.elements.name.value}</p>
                  <h4 className="text-4xl sm:text-6xl">{item.elements.count.value}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
