// src/app/article/[slug]/page.tsx

import { deliveryClient, SITE_URL } from "@/modules/Globals";
import Link from "next/link";
import Image from "next/image";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { slugify } from "@/modules/Helper";
import { cache } from "react";
import { buildMetadata } from "@/modules/seo";
import ShareButton from "@/components/UI/ShareButton";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("press_release_page")
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
  const pageData = data.pressreleaseitem.linkedItems.find(
    (i: any) => slugify(i.elements.heading.value) === slug
  );

  return buildMetadata({
    title: pageData?.elements.heading.value,
    description: pageData?.elements.content?.value,
    image:
      pageData?.elements.image.value[0]?.url ??
      `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}/press-releases/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogsRes = await deliveryClient
    .item("press_release_page")
    .depthParameter(2)
    .toPromise();

  const blogsData = blogsRes.data.item.elements as any;
  const pageData = blogsData.pressreleaseitem.linkedItems.find(
    (i: any) => slugify(i.elements.heading.value) === slug
  );

  if (!pageData) return <div>Blog not found</div>;

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
                    alt={pageData.elements.image.value[0]?.name}
                    className="w-full h-full max-h-[700px] object-cover object-center"
                  />
                </div>
              </div>

              <div className={`col-span-12 `}>
                <div
                  className="prose prose-gray max-w-none leading-relaxed prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-img:rounded-xl prose-img:border prose-img:border-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: pageData.elements.content.value,
                  }}
                />
              </div>
            </article>
          </div>
        </Section>
      </div>
    </div>
  );
}

// (Optional) SSG helpers
export const revalidate = 60;

export async function generateStaticParams() {
  const blogsRes = await deliveryClient
    .item("press_release_page")
    .depthParameter(3)
    .toPromise();

  const blogsData = blogsRes.data.item.elements as any;
  return blogsData.pressreleaseitem.linkedItems.map((i: any) => ({
    slug: slugify(i.elements.heading.value),
  }));
}
