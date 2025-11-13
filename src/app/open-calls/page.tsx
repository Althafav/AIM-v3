import PageLoader from "@/components/globals/PageLoader";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import { CountdownTimer } from "@/components/UI/Countdown/CountdownTimer";

import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";

import Link from "next/link";
import React, { cache } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("open_calls_page_2026")
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
    canonical: `${SITE_URL}open-calls`,
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
      <Section className="">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pageData.opencallsitems.linkedItems.map(
              (item: any, index: number) => {
                const isClosed =
                  item.elements.status.value[0].name === "Closed";
                const isClosingSoon =
                  item.elements.status.value[0].name === "Closing Soon";
                const isLive =
                  item.elements.status.value[0].name === "Live Now";
                const Card = (
                  <div
                    key={item.system.id}
                    className={`open-calls-card group ${
                      !isLive
                        ? "grayscale"
                        : "hover:opacity-100 hover:scale-[1.02] transition-all duration-300"
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={item.elements.image.value[0]?.url}
                        alt={item.elements.name.value}
                        className="aspect-square object-cover h-full w-full rounded-3xl transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />

                      <div
                        className={`absolute bottom-10 w-full p-2 text-center text-white font-bold ${
                          isClosed ? "bg-red-600" : "bg-primary"
                        }`}
                      >
                        {isLive
                          ? "Register Now"
                          : item.elements.status.value[0].name}

                        {isClosingSoon && (
                          <div>
                            <div className="small d-flex gap-2 text-center justify-content-center m-0">
                              Ends In:
                              <CountdownTimer
                                endDate={item.elements.enddate.value}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-5 py-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-2xl font-medium">
                          {item.elements.name.value}
                        </h4>
                        <IoArrowForwardCircleOutline
                          className={`text-gray-500 ${
                            isLive && "infinite-animate-X"
                          }`}
                          size={48}
                        />
                      </div>
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />
                    </div>
                  </div>
                );

                return isLive ? (
                  <Link
                    href={item.elements.buttonlink.value}
                    className=""
                    key={index}
                  >
                    {Card}
                  </Link>
                ) : (
                  <div className="" key={index}>
                    {Card}
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

export const revalidate = 60;
