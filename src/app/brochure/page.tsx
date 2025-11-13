import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import React, { cache } from "react";
import BrochureClient from "./BrochureClient";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("brochure_reports")
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
    canonical: `${SITE_URL}brochure`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return null;
  return <BrochureClient pageData={pageData} />;
}
