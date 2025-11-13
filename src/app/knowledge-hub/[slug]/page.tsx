// src/app/article/[slug]/page.tsx

import { deliveryClient, SITE_URL } from "@/modules/Globals";
import Link from "next/link";
import Image from "next/image";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import { slugify } from "@/modules/Helper";
import ShareButton from "@/components/UI/ShareButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const Res = await deliveryClient
    .items()
    .type("paperitem")
    .equalsFilter("elements.slug", slug)
    .depthParameter(3)
    .toPromise();

  const pageData = Res.data.items[0] as any;

  if (!pageData) {
    return { title: "not found", robots: { index: false, follow: false } };
  }

  const title =
    pageData.metadata__metatitle?.value || pageData.elements.heading.value;
  const description =
    pageData.metadata__metadescription?.value ||
    pageData.elements.content?.value ||
    "";
  const ogImage = pageData.elements.image.value[0]?.url;
  const url = `${SITE_URL}knowledge-hub/${slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const Res = await deliveryClient
    .items()
    .type("paperitem")
    .equalsFilter("elements.slug", slug)
    .depthParameter(3)
    .toPromise();

  const pageData = Res.data.items[0] as any;

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
