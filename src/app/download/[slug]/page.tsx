import PageLoader from "@/components/globals/PageLoader";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await deliveryClient
    .items()
    .type("downloadpage")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;
  return buildMetadata({
    title: pageData.metadata__pagetitle?.value,
    description: pageData.metadata__metadescription?.value,
    image: `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}download/${slug}`,
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
    .type("downloadpage")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;

  if (!pageData) return <PageLoader />;
  return (
    <div>
      <iframe
        src={pageData.pdflink.value}
        width="100%"
        height="1000px"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
}
