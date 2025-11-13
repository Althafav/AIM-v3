import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import Image from "next/image";
import SponsorsClient from "./SponsorsClient";

export default async function page() {
  const pageResponse = await deliveryClient
    .item("n2025_sponsors_page")
    .depthParameter(2)
    .toPromise();

  const pageData = pageResponse.data.item.elements as any;
  if (!pageData) return null;
  return (
    <div>
      <HeadBanner heading={pageData.heading.value} />
      <Section>
        <div className="container mx-auto">
         <SponsorsClient items={pageData.sponsors.linkedItems} />
        </div>
      </Section>
    </div>
  );
}
