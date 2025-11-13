import BlogsSection from "@/components/Home/BlogsSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import PillarSection from "@/components/Home/PillarSection";
import SponsorsCarousel from "@/components/Home/SponsorCarousel";
import StatsSection from "@/components/Home/StatsSection";
import TabbedCarousels from "@/components/Home/TabbedCarousels";
import TargetAudientsSection from "@/components/Home/TargetAudientsSection";
import TestimonialCarousel from "@/components/Home/TestimonialCarousel";
import ThemeSection from "@/components/Home/ThemeSection";
import YoutubeVideoCarousel from "@/components/Home/YoutubeVideoCarousel";
import CTABlock from "@/components/UI/Blocks/CTABlock";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import { cache } from "react";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("home_page_2026")
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
    canonical: `${SITE_URL}`,
  });
}

export default async function Home() {
  const pageData = await getPageData();
  if (!pageData) return null;
  return (
    <div className="page">
      <HeroSection
        bannerheading={pageData.bannerheading.value}
        datevenue={pageData.datevenue.value}
        ctabuttons={pageData.bannercta.linkedItems}
        bannerimage={pageData.bannerimage.value[0]?.url}
        bannervideosrc={pageData.bannervideolink.value}
      />
      <StatsSection
        statsheading={pageData.statsheading.value}
        statscontent={pageData.statscontent.value}
        statsitems={pageData.statsitems.linkedItems}
        downloadreportlink={pageData.downloadreportlink.value}
      />

      <ThemeSection
        themetag="2025 Theme"
        themeline1={pageData.themeline1.value}
        themeline2={pageData.themeline2.value}
      />

      <PillarSection
        heading={pageData.pillarheading.value}
        pillaritems={pageData.pillaritems.linkedItems}
        ctabuttonname={pageData.pillarctabuttontext.value}
        ctabuttonlink={pageData.pillarctalink.value}
      />

      <TargetAudientsSection
        heading={pageData.targetaudientsheading.value}
        items={pageData.targetaudientsitems.linkedItems}
      />
      <FeaturesSection
        heading={pageData.featuresheading.value}
        items={pageData.featuresitems.linkedItems}
      />

      <SponsorsCarousel
        heading="Sponsors 2025"
        ctaname="View all Sponsors"
        ctalink="/sponsors-2025"
      />

      <TabbedCarousels />

      <TestimonialCarousel
        heading={pageData.testimonialsheading.value}
        items={pageData.testimonialitems.linkedItems}
        ctaname={pageData.testimonialctaname.value}
        ctalink={pageData.testimonialctalink.value}
      />

      <BlogsSection
        heading="Media Centre"
        ctaname="View all"
        ctalink="/articles"
      />

      <Section className="bg-white">
        <YoutubeVideoCarousel
          heading={pageData.youtubeheading.value}
          subheading={pageData.youtubesubheading.value}
          ctaname="View AIM Youtube"
          ctalink="https://www.youtube.com/@AnnualInvestmentMeeting"
          items={pageData.youtubeitems.linkedItems}
        />
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

export const revalidate = 60;
