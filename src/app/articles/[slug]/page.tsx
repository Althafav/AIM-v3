// src/app/article/[slug]/page.tsx

import { deliveryClient, SITE_URL } from "@/modules/Globals";
import Link from "next/link";
import Image from "next/image";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { slugify } from "@/modules/Helper";
import ShareButton from "@/components/UI/ShareButton";
import { cache } from "react";
import { buildMetadata } from "@/modules/seo";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("blog_page")
    .depthParameter(2)
    .toPromise();
  return res.data.item.elements as any;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPageData();
  const pageData = data.articles_items.linkedItems.find(
    (i: any) => slugify(i.elements.heading.value) === slug
  );

  return buildMetadata({
    title: pageData?.elements.heading.value,
    description: pageData?.elements.content?.value,
    image:
      pageData?.elements.image.value[0]?.url ??
      `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}/articles/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const Res = await deliveryClient
    .item("blog_page")
    .depthParameter(2)
    .toPromise();

  const Data = Res.data.item.elements as any;
  const pageData = Data.articles_items.linkedItems.find(
    (i: any) => slugify(i.elements.heading.value) === slug
  );

  if (!pageData) return null;

  return (
    <div className="blog-detail-page bg-white">
      <div className="">
        <HeadBanner heading={pageData.elements.heading.value}>
          <p className="text-sm text-gray-500">
            {pageData.system.lastModified
              ? new Date(pageData.system.lastModified).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )
              : ""}
          </p>

          <div className="bg-black inline-block mt-4 rounded-full">
            <ShareButton />
          </div>
        </HeadBanner>

        <Section>
          <div className="container mx-auto">
            <article className="grid grid-cols-12 gap-10">
              <div className="col-span-12">
                <div>
                  <Image
                    width={1920}
                    height={1080}
                    src={pageData.elements.image.value[0]?.url}
                    alt={pageData.elements.heading.value}
                    className="w-full h-full max-h-[700px] object-cover object-center"
                  />
                </div>
              </div>

              <div
                className={`col-span-12  ${
                  pageData.elements.relateditems.linkedItems.length > 0
                    ? "lg:col-span-8"
                    : "lg-col-span-12"
                }`}
              >
                <div
                  className="prose prose-gray max-w-none leading-relaxed prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-img:rounded-xl prose-img:border prose-img:border-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: pageData.elements.content.value,
                  }}
                />
              </div>

              {pageData.elements.relateditems.linkedItems.length > 0 && (
                <aside className="col-span-12 lg:col-span-4">
                  <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur p-4">
                    <h4 className="mb-3 text-sm font-semibold tracking-tight text-gray-700">
                      Related Blogs
                    </h4>
                    {pageData.elements.relateditems.linkedItems.map(
                      (item: any) => (
                        <Link
                          href={`/article/${item.elements.slug.value}`}
                          key={item.system.id}
                          className="bg-white block"
                        >
                          <div className="aspect-video w-full overflow-hidden">
                            <img
                              src={item.image.value[0]?.url}
                              alt={item.heading.value}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                            />
                          </div>
                          <div className="p-2">
                            <p className="tracking-tighter line-clamp-2 text-sm font-medium leading-snug text-gray-900 group-hover:text-blue-700">
                              {item.heading.value}
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </aside>
              )}
            </article>
          </div>
        </Section>
      </div>
    </div>
  );
}

export const revalidate = 60;

export async function generateStaticParams() {
  const pageData = await getPageData();
  return pageData.articles_items.linkedItems.map((i: any) => ({
    slug: slugify(i.elements.heading.value),
  }));
}
