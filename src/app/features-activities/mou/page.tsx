import PageLoader from "@/components/globals/PageLoader";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import ButtonComponent from "@/components/UI/ButtonComponent";
import Section from "@/components/UI/Section";

import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";
import { cache } from "react";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("mou_page_2026")
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
  if (!pageData) return <PageLoader />;
  return (
    <div>
      <HeadBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
      />

      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <h1 className="theme-gradient-text-2 text-2xl sm:text-6xl">
                {pageData.moucount.value}+
              </h1>
              <h1 className="theme-gradient-text-2 text-2xl sm:text-4xl max-w-md">
                {pageData.moucountheading.value}
              </h1>

              {pageData.ctabuttonlink.value && (
                <div className="mt-8">
                  <ButtonComponent
                    name={pageData.ctabuttonname.value}
                    link={pageData.ctabuttonlink.value}
                  />
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              {pageData.moucountdescription.value}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col gap-10">
            <div className="col-12">
              <h2 className="text-black text-2xl sm:text-3xl mb-3">
                {pageData.aimtocompanyheading.value}
              </h2>
              <p className="prose max-w-none">
                {pageData.aimtocompanydescription.value}
              </p>
            </div>

            <div className="col-12">
              <h2 className="text-black text-2xl sm:text-3xl mb-3">
                {pageData.companytocompanyheading.value}
              </h2>
              <p className="prose max-w-none">
                {pageData.companytocompanydescription.value}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          {pageData.featuredmouitems.linkedItems.length > 0 && (
            <div className="related-items-section">
              <h4 className="text-black mb-8 text-2xl sm:text-3xl font-medium">
                {pageData.featuredmouheading.value}
              </h4>
              <div className="grid sm:grid-cols-4 gap-5">
                {pageData.featuredmouitems.linkedItems.map(
                  (item: any, index: number) => {
                    return (
                      <div className="" key={index}>
                        <Link
                          href={`/features-activities/mou/${item.elements.slug.value}`}
                          className="related-items"
                        >
                          <div className="mb-2">
                            <img
                              src={item.elements.image.value[0]?.url}
                              alt={item.elements.name.value}
                              className="rounded-3xl aspect-video object-cover"
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="text-black small ">
                              {item.elements.name.value}
                            </h6>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0;
