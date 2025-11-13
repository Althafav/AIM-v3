import HeadBanner from "@/components/UI/Banner/HeadBanner";
import CTABlock from "@/components/UI/Blocks/CTABlock";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import SideForumSlider from "./SideForumSlider";
import { buildMetadata } from "@/modules/seo";
import { cache } from "react";
import PageLoader from "@/components/globals/PageLoader";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("conference_page_2026")
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
    canonical: `${SITE_URL}conference`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return <PageLoader />;
  return (
    <div>
      <HeadBanner
        heading={pageData.bannerheading?.value}
        subheading={pageData.bannersubheading?.value}
      />
      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <h1 className="theme-gradient-text-2 text-4xl">
                {pageData.aboutheading.value}
              </h1>
            </div>

            <div>
              <p>{pageData.aboutdescription.value}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Plenary Session */}
            <article className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              {/* Image */}
              <div className="relative">
                <img
                  src={pageData?.planerysessionimage?.value?.[0]?.url}
                  alt={
                    pageData?.planerysessionimage?.value?.[0]?.name ||
                    "Plenary session"
                  }
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* glass overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/0" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900">
                  {pageData?.planerysessionheading?.value}
                </h4>

                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  {pageData?.planerysessiondescription?.value}
                </p>
              </div>
            </article>

            {/* Thematic Area */}
            <article className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              {/* Image */}
              <div className="relative">
                <img
                  src={pageData?.thematicareaimage?.value?.[0]?.url}
                  alt={
                    pageData?.thematicareaimage?.value?.[0]?.name ||
                    "Thematic area"
                  }
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/0" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900">
                  {pageData?.thematicareaheading?.value}
                </h4>

                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  {pageData?.thematicareadescription?.value}
                </p>
              </div>
            </article>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          <h4 className="text-2xl max-w-3xl font-semibold  tracking-tight mb-4">
            {pageData.sideforumheading.value}
          </h4>
          <p>{pageData.sideforumdescription.value}</p>

          <div className="mt-8">
            <SideForumSlider items={pageData.sideforumitems.linkedItems} />
          </div>
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

export const revalidate = 0;
