import FeaturesSection from "@/components/Home/FeaturesSection";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import CTABlock from "@/components/UI/Blocks/CTABlock";
import ButtonComponent from "@/components/UI/ButtonComponent";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Image from "next/image";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await deliveryClient
    .items()
    .type("pillardetailpageitem")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;
  return buildMetadata({
    title: pageData.metadata__pagetitle?.value,
    description: pageData.metadata__metadescription?.value,
    image: `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}pillars/${slug}`,
  });
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await deliveryClient
    .items()
    .type("pillardetailpageitem")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;
  return (
    <div className="">
      <HeadBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
      />

      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-5">
            <Image
              width={1080}
              height={300}
              src={pageData.bannerimage.value[0]?.url}
              alt=""
              className="w-full "
            />

            <div>
              <h2
                className="text-3xl sm:text-5xl font-medium mb-3 tracking-tighter"
                style={{ color: pageData.brandcolorcode.value }}
              >
                {pageData.aboutheading.value}
              </h2>
              <div className="sm:columns-2 prose max-w-none gap-10">
                <p>{pageData.aboutdescription.value}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          {pageData.trackitems.linkedItems.map((item: any, index: number) => (
            <div
              key={index}
              className="py-5 sticky-stack-section bg-white"
              style={{
                position: "sticky",
                top: 0,

                zIndex: index + 1,

                borderRadius: "1.5rem",
              }}
            >
              <div className="" id={`${item.elements.slug.value}`}>
                <Image
                  width={1080}
                  height={300}
                  src={item.elements.image2.value[0]?.url}
                  unoptimized
                  alt={item.elements.image2.value[0]?.name}
                  className=" mb-4 h-auto sm:max-h-80 w-full sm:object-cover rounded-2xl sm:rounded-3xl"
                />

                <div className="grid sm:grid-cols-3 gap-5 p-5">
                  <h2 className="text-3xl sm:text-5xl mb-3 tracking-tighter">
                    {item.elements.name.value}
                  </h2>

                  <div className="sm:col-span-2">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: item.elements.content.value,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="flex justify-between flex-wrap items-center mb-8 gap-5">
            <div>
              <h2 className="text-3xl sm:text-5xl font-medium mb-3 tracking-tighter">
                {pageData.sustainableheading.value}
              </h2>
              <p className="prose max-w-4xl">
                {pageData.sustainabledescription.value}
              </p>
            </div>
            <div>
              <ButtonComponent
                name={pageData.sustainablectaname.value}
                link={pageData.sustainablectalink.value}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0 auto-rows-fr ">
            {pageData.sustainableitems.linkedItems.map(
              (item: any, index: number) => (
                <div key={index}>
                  <div className="gradient-1 h-[200px] p-5 hover-lift-with-shadow-lg">
                    <div
                      className="text-black text-xl sm:text-2xl mb-3 content-wrapper"
                      dangerouslySetInnerHTML={{
                        __html: item.elements.name.value,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <FeaturesSection
          heading={pageData.featuresactivitiesheading.value}
          items={pageData.featuresitems.linkedItems}
        />
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

export const revalidate = 0;
