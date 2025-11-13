import { deliveryClient, SITE_URL } from "@/modules/Globals";
import KnowledgeHubClient from "./KnowledgeHubClient";
import { cache } from "react";
import { buildMetadata } from "@/modules/seo";
import PageLoader from "@/components/globals/PageLoader";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("knowledge_hub_page_2026")
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
    canonical: `${SITE_URL}knowledge-hub`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return <PageLoader />;
  return (
    <div>
      <div>
        <KnowledgeHubClient pageData={pageData} />;
      </div>
    </div>
  );
}
