// src/app/matchmaking/page.tsx
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import MatchmakingClient from "./MatchmakingClient";
import { cache } from "react";
import { buildMetadata } from "@/modules/seo";
import PageLoader from "@/components/globals/PageLoader";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("match_making_page_2026")
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
    canonical: `${SITE_URL}matchmaking`,
  });
}

export default async function Page() {
  const pageData = await getPageData();
  if (!pageData) return <PageLoader />;

  return (
    <div>
      <HeadBanner
        heading={pageData.bannerheading?.value}
        subheading={pageData.bannersubheading?.value}
      />

      <Section className="bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <MatchmakingClient pageData={pageData} />
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 60;
