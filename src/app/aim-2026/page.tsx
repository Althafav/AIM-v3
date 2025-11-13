import HeadBanner from "@/components/UI/Banner/HeadBanner";
import CTABlock from "@/components/UI/Blocks/CTABlock";
import ImageTextBlock from "@/components/UI/Blocks/ImageTextBlock";
import GradientOverlayComponent from "@/components/UI/GradientOverlayComponent";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";
import { cache } from "react";

import { IoArrowForwardCircleOutline } from "react-icons/io5";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("aim_2026_page")
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
  if (!pageData) return null;
  return (
    <div>
      <HeadBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
      />
      <Section className="bg-white">
        <div className="container mx-auto">
          <ImageTextBlock
            heading={pageData.aim2026heading.value}
            content={pageData.aim2026description.value}
            imageSrc={pageData.aim2026image.value[0]?.url}
            ctaname={pageData.downloadbrochurebuttonname.value}
            ctalink={pageData.downloadbrochurelink.value}
            imagePosition="left"
          />
        </div>
      </Section>

      <Section>
        <div className="container mx-auto" id="features-activities">
          <h2 className="text-4xl mb-2 tracking-wider font-light">
            {" "}
            {pageData.featuresheading.value}
          </h2>
          <p className="text-md text-gray-500 mb-10 max-w-4xl">
            {pageData.featuresdescription.value}
          </p>

          <div className="grid md:grid-cols-3 gap-5 auto-rows-fr h-[450px]">
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

      <Section className="bg-white">
        <div className="container mx-auto">
          <ImageTextBlock
            heading={pageData.venueheading.value}
            content={pageData.venuedescription.value}
            imageSrc={pageData.venueimage.value[0]?.url}
            ctaname="Experience Dubai"
            ctalink={pageData.venuecta.value}
            imagePosition="right"
          />
        </div>
      </Section>

      {pageData.ctablock.linkedItems.length > 0 && (
        <Section className="bg-white">
          <div className="container mx-auto">
            {pageData.ctablock.linkedItems.map((item: any, index: number) => {
              return (
                <div className="" key={index}>
                  <CTABlock
                    heading={item.elements.name.value}
                    ctabuttonname={item.elements.ctabuttonname.value}
                    ctabuttonlink={item.elements.ctabuttonlink.value}
                  />
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}

export const revalidate = 60;
