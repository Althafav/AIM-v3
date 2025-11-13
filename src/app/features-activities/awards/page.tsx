import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import React, { cache } from "react";
import AwardAccordion from "./AwardAccordion";
import GradientOverlayComponent from "@/components/UI/GradientOverlayComponent";
import { buildMetadata } from "@/modules/seo";
import PageLoader from "@/components/globals/PageLoader";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("award_page_2026")
    .depthParameter(2)
    .toPromise();
  return res.data.item.elements as any;
});

export async function generateMetadata() {
  const data = await getPageData();
  return buildMetadata({
    title: data.metadata__pagetitle?.value,
    description: data.metadata__metadescription?.value,
    image: `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}awards`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return <PageLoader />;
  return (
    <div>
      <HeadBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
      />
      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <h1 className="theme-gradient-text-2 text-4xl">
                {pageData.aboutheading.value}
              </h1>
            </div>

            <div>
              <p>{pageData.aboutdescription.value}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <AwardAccordion items={pageData.awarditems.linkedItems} />
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl mb-8 font-medium text-gray-500">
            {" "}
            {pageData.juryheading.value}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {pageData.juryitems.linkedItems.map((item: any) => {
              return (
                <div key={item.system.id} className="group">
                  <div className="relative hover-lift-with-shadow-lg  rounded-3xl overflow-hidden h-[400px] sm:h-96 flex justify-center items-end p-5">
                    <img
                      src={item.elements.image.value[0]?.url}
                      alt={item.elements.image.value[0]?.name}
                      className="absolute inset-0 object-cover object-top w-full h-full"
                    />
                    <GradientOverlayComponent />
                    <div className="relative  text-center ">
                      <h4 className="text-white font-medium text-xl">
                        {item.elements.name.value}
                      </h4>
                      <p className="text-white">
                        {item.elements.company.value}
                      </p>
                    </div>
                  </div>

                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-center">
                    {item.elements.designation.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0;
