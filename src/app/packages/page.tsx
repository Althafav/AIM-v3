// app/delegate-packages/page.tsx
import React, { cache } from "react";
import { deliveryClient, SITE_URL } from "@/modules/Globals"; // or use your Globals.KontentClient variant
import BannerWithCountdown from "./BannerWithCountdown";
import PackageCard from "./PackageCard";
import { buildMetadata } from "@/modules/seo";
import PageLoader from "@/components/globals/PageLoader";

type SearchParams = {
  invitee?: string;
  source?: string;
};

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("delegate_packages_2026")
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
    canonical: `${SITE_URL}packages`,
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { invitee = "", source = "" } = (await searchParams) ?? {};

  const pageData = await getPageData();
  if (!pageData) return <PageLoader />;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="relative">
        <BannerWithCountdown
          imageUrl={pageData?.bannerimage?.value?.[0]?.url}
          heading={pageData?.bannerheading?.value}
          eventDate="2026-04-13T00:00:00"
        />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pageData?.packageitems?.linkedItems.map((item: any) => (
            <PackageCard
              key={item?.system?.id}
              item={item}
              invitee={invitee}
              source={source}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
