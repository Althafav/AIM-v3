import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";

import { deliveryClient } from "@/modules/Globals";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await deliveryClient
    .items()
    .type("mouitem")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;
  return (
    <div className="">
      <HeadBanner heading={pageData.heading.value} />
      <Section className="bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <img
                className="rounded-3xl aspect-video w-full object-cover"
                src={pageData.image.value[0]?.url}
                alt={pageData.image.value[0]?.name}
              />
            </div>

            <div className="flex flex-wrap items-start justify-center gap-6">
              {pageData.mouentityitems.linkedItems.map(
                (item: any, index: number) => (
                  <div
                    key={item.system.id}
                    className="flex flex-col items-center text-center"
                  >
                    <Link
                      href={item.elements.websitelink.value}
                      target="_blank"
                      className="block"
                    >
                      <div
                        className="
                flex h-32 w-32 items-center justify-center
                rounded-2xl border border-neutral-300 bg-white p-4
                shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
              "
                      >
                        <img
                          src={item.elements.logo.value[0]?.url}
                          alt={item.elements.name.value}
                          className="max-h-16 max-w-full object-contain"
                        />
                      </div>
                    </Link>
                    <p className="mt-2 text-sm font-medium text-neutral-700">
                      {item.elements.name.value}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          <div className="">
            <div>
              <h1 className="theme-gradient-text-2 sm:text-4xl mb-3">
                {pageData.heading.value}
              </h1>
            </div>

            <div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.moudescription.value,
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="flex flex-col gap-5">
            {pageData.mouentityitems.linkedItems.map(
              (item: any, index: number) => {
                return (
                  <div className="" key={item.system.id}>
                    <h4 className="text-black mb-3 text-xl sm:text-2xl">
                      {item.elements.name.value}
                    </h4>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: item.elements.content.value,
                      }}
                    />

                    {item.elements.image.value[0]?.url && (
                      <div className="col-lg-4">
                        <img
                          src={item.elements.image.value[0]?.url}
                          alt=""
                          className="h-100 rounded-3xl"
                        />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto">
          {pageData.relatedmou.linkedItems.length > 0 && (
            <div className="related-items-section">
              <h4 className="text-black mb-8 text-2xl sm:text-3xl font-medium">
                {pageData.relatedmouheading.value}
              </h4>
              <div className="grid sm:grid-cols-4 gap-5">
                {pageData.relatedmou.linkedItems.map(
                  (item: any, index: number) => {
                    return (
                      <div className="" key={index}>
                        <Link
                          href={`/mous/${item.elements.slug.value}`}
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
