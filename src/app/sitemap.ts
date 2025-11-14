import { MetadataRoute } from "next";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { slugify } from "@/modules/Helper";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogsRes = await deliveryClient
    .item("blog_page")
    .depthParameter(3)
    .toPromise();

  const blogsData = blogsRes.data.item.elements as any;

  const articles = blogsData.articles_items?.linkedItems ?? [];

  const articleUrls = articles.map((item: any) => ({
    url: `${SITE_URL}/article/${slugify(item.elements.heading.value)}`,
    lastModified: new Date(item.system.last_modified || Date.now()),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticPages = [
    { path: `${SITE_URL}`, priority: 1, changeFrequency: "daily" },
    { path: `${SITE_URL}about`, priority: 0.9, changeFrequency: "monthly" },
    {
      path: `${SITE_URL}register-interest`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { path: `${SITE_URL}aim-2026`, priority: 0.9, changeFrequency: "monthly" },
    { path: `${SITE_URL}/pillars`, priority: 0.8, changeFrequency: "monthly" },
    {
      path: `${SITE_URL}pillars/global-markets`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}pillars/future-economies`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}pillars/nexgen`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}features-activities`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}features-activities/awards`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}features-activities/conference`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}features-activities/exhibition`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}features-activities/matchmaking`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}features-activities/mou`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}open-calls`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}press-releases`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}knowledge-hub`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}postshow-reports`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    { path: `${SITE_URL}articles`, priority: 0.8, changeFrequency: "weekly" },
    {
      path: `${SITE_URL}exhibitors-2025`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}speakers-2025`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}sponsors-2025`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: `${SITE_URL}our-partners`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
  ].map((p) => ({
    url: `${p.path}`,
    lastModified: new Date(),
    changeFrequency:
      p.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: p.priority,
  }));

  return [...staticPages, ...articleUrls];
}
