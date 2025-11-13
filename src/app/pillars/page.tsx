import PageLoader from "@/components/globals/PageLoader";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import ButtonComponent from "@/components/UI/ButtonComponent";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";
import { cache } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("pillar_page_2026")
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
    canonical: `${SITE_URL}pillars`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return <PageLoader/>;

  return (
    <div>
      {" "}
      <HeadBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
      />
      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-10">
            {pageData.pillaritems.linkedItems.map(
              (item: any, index: number) => {
                return (
                  <div className="grid lg:grid-cols-5 gap-10" key={index}>
                    <div className="col-span-2">
                      <h3 className="text-3xl tracking-tighter text-gray-500">
                        {" "}
                        {item.elements.heading.value}
                      </h3>
                      <h2
                        className="text-4xl tracking-tighter mb-4"
                        style={{ color: item.elements.colorcode.value }}
                      >
                        {item.elements.name.value}
                      </h2>
                      <div
                        className="line-clamp-3 mb-3 content-wrapper"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />

                      <ButtonComponent
                        name={item.elements.ctabuttonname.value}
                        link={item.elements.ctabuttonlink.value}
                        colorCode={item.elements.colorcode.value}
                      />
                    </div>

                    <div className="col-span-3">
                      {/* Mobile: horizontal scroll; Desktop: 3-col grid */}
                      <div
                        className="
      md:grid md:grid-cols-3 md:gap-5
      -mx-4 px-4
      flex gap-4 overflow-x-auto md:overflow-visible
      snap-x snap-mandatory
      pb-2
      [scrollbar-width:none] md:[scrollbar-width:auto]
      [-ms-overflow-style:none]
    "
                        style={{
                          scrollbarWidth: "none",
                        }}
                      >
                        {item.elements.portfolioitems?.linkedItems.map(
                          (portfolio: any, index: number) => (
                            <Link
                              scroll={true}
                              href={`/pillars/${item.elements.slug.value}/#${portfolio.elements.slug.value}`}
                              key={index}
                              className="
          relative group
          md:rounded-3xl
          snap-start
          flex-none w-[78%] xs:w-[70%] sm:w-[60%] md:w-auto
        "
                            >
                              <img
                                src={portfolio.elements.image1.value[0]?.url}
                                alt={portfolio.elements.name.value}
                                className="aspect-square object-cover rounded-3xl w-full h-full"
                              />

                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent rounded-3xl" />

                              {/* Caption + icon */}
                              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <h4 className="text-white font-medium max-w-[150px]">
                                  {portfolio.elements.name.value}
                                </h4>
                                <IoArrowForwardCircleOutline
                                  className="text-white"
                                  size={32}
                                />
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
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
