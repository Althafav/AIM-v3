import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";

import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await deliveryClient
    .items()
    .type("sideforumitem2026")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;
  return buildMetadata({
    title: pageData.sessionname.value,
    description: pageData.sessioncontent?.value,
    image: pageData.images.value[0]?.url ?? `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}side-forums/${slug}`,
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
    .type("sideforumitem2026")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;
  return (
    <div className="">
      {/* <HeadBanner heading={pageData.sessionname.value} /> */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 gap-5">
            <img
              className="rounded-3xl aspect-video w-full "
              src={pageData.images.value[0]?.url}
              alt={pageData.images.value[0]?.name}
            />

            <div>
              <h1 className="theme-gradient-text-2 text-2xl mb-3">
                {pageData.sessionname.value}
              </h1>
              <div className="d-flex gap-2 align-items-center flex-wrap mb-4">
                {pageData.entities.value
                  .split(",")
                  .map((entity: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-black text-white rounded-full small"
                    >
                      {entity}
                    </span>
                  ))}
              </div>
            </div>

            <div className="">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.sessioncontent.value,
                }}
              />
            </div>
          </div>

          <Section>
            <div className="flex flex-col gap-10">
              {pageData.entityitems.linkedItems.map((item: any) => {
                return (
                  <div key={item.system.id} className="">
                    <div className="sm:col-span-2">
                      <h4 className="text-black mb-2 text-xl sm:text-2xl font-medium tracking-tight">
                        {item.elements.name.value}
                      </h4>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />
                    </div>

                    <div className="mt-8">
                      <img
                        className=" rounded-3xl object-top"
                        src={item.elements.image.value[0]?.url}
                        alt={item.elements.name.value}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          {pageData.relateditems.linkedItems.length > 0 && (
            <div className="related-items-section">
              <h4 className="text-black mb-8 text-2xl sm:text-3xl font-medium">
                Related Side Forums
              </h4>
              <div className="grid sm:grid-cols-4 gap-5">
                {pageData.relateditems.linkedItems.map(
                  (item: any, index: number) => {
                    return (
                      <div className="" key={index}>
                        <Link
                          href={`/side-forums/${item.elements.slug.value}`}
                          className="related-items"
                        >
                          <div className="mb-2">
                            <img
                              src={item.elements.images.value[0]?.url}
                              alt={item.elements.sessionname.value}
                              className="rounded-3xl aspect-video object-cover"
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="text-black small ">
                              {item.elements.sessionname.value}
                            </h6>
                            <span>{item.elements.date.value}</span>
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
