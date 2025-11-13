import PageLoader from "@/components/globals/PageLoader";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import React, { cache } from "react";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("exhibition_ed8c288")
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
    canonical: `${SITE_URL}exhibition`,
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
          <div>
            {pageData.activitiesitems.linkedItems.map(
              (m: any, index: number) => {
                const item = m;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`flex flex-col-reverse md:flex-row items-start gap-8 mb-16 ${
                      !isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Text Column */}
                    <div className="w-full md:w-1/2">
                      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-3">
                        {item.elements.name.value}
                      </h2>
                      <div
                        className="prose max-w-none text-neutral-600"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />
                    </div>

                    {/* Image Column */}
                    <div className="w-full md:w-1/2">
                      <img
                        src={item.elements.image.value[0]?.url}
                        alt={item.elements.name.value}
                        className={`w-full rounded-3xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.02] aspect-video`}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0;
