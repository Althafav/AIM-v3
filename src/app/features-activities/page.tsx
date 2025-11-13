import PageLoader from "@/components/globals/PageLoader";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import GradientOverlayComponent from "@/components/UI/GradientOverlayComponent";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";
import { cache } from "react";

import { IoArrowForwardCircleOutline } from "react-icons/io5";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("features_and_activities_page")
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
    canonical: `${SITE_URL}features-activities`,
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
      <Section>
        <div className="container mx-auto" id="features-activities">
          <div className="grid md:grid-cols-3 gap-5 auto-rows-fr sm:h-[450px]">
            {pageData.featuresitems.linkedItems.map(
              (item: any, index: number) => (
                <Link
                  href={item.elements.ctacardlink.value}
                  key={index}
                  className={`relative hover:-translate-y-2 duration-300 transition-transform ${
                    index === 2 ? "md:row-span-2" : ""
                  }`}
                >
                  <img
                    src={item.elements.ctacardimage.value[0]?.url}
                    alt=""
                    className="object-cover rounded-3xl w-full h-full"
                  />

                  <GradientOverlayComponent
                    direction="top"
                    fromColor="black"
                    toColor="transparent"
                  />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <h4 className="text-white font-medium max-w-[150px] text-2xl">
                      {item.elements.name.value}
                    </h4>
                    <IoArrowForwardCircleOutline
                      className="text-white"
                      size={32}
                    />
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 60;
