import PageLoader from "@/components/globals/PageLoader";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import ButtonComponent from "@/components/UI/ButtonComponent";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";

import Image from "next/image";
import React, { cache } from "react";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("about_page_2026")
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
    canonical: `${SITE_URL}about`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return <PageLoader/>;
  return (
    <div>
      <HeadBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
      />
      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-col-1 gap-10">
            <Image
              width={1920}
              height={1080}
              className="w-full rounded-3xl"
              src={pageData.aimimage.value[0]?.url}
              alt=""
            />
            <div className="sm:columns-2 lg:columns-3 gap-8">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutsummary.value,
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="gradient-1">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-medium">
                {pageData.missiontitle.value}
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.missiontext.value,
                }}
              />
            </div>

            <div>
              <h2 className="text-3xl font-medium">
                {pageData.visiontitle.value}
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.visiontext.value,
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Image
                width={800}
                height={400}
                className="w-full rounded-3xl"
                src={pageData.agfimage.value[0]?.url}
                alt={pageData.agfheading.value}
              />
            </div>

            <div>
              <h2 className="text-3xl font-medium mb-5">
                {pageData.agfheading.value}
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.agfcontent.value,
                }}
              />
              {pageData.agfctalink.value && (
                <div className="mt-10">
                  <ButtonComponent
                    name="Visit website"
                    link={pageData.agfctalink.value}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <div className="bg-white pt-20 overflow-hidden">
        <div className="container mx-auto">
          <h3 className="text-center text-3xl font-medium tracking-tighter">
            {pageData.tailendheading.value}
          </h3>
          <p className="text-center text-xl text-gray-500 tracking-tighter">
            {pageData.tailendsubheading.value}
          </p>
          <div></div>
        </div>
        <img
          className="w-full object-contain object-center"
          src={pageData.tailendimage.value[0]?.url}
          alt=""
        />
      </div>
    </div>
  );
}

export const revalidate = 60;
