import { MetadataRoute } from "next";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { slugify } from "@/modules/Helper";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const blogsRes = await deliveryClient
    .item("blog_page")
    .depthParameter(3)
    .toPromise();

  const blogsData = blogsRes.data.item.elements as any;

  const articles = blogsData.articles_items?.linkedItems ?? [];

  const articleUrls = articles.map((item: any) => ({
    url: `${baseUrl}/article/${slugify(item.elements.heading.value)}`,
    lastModified: new Date(item.system.last_modified || Date.now()),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/register-interest", priority: 0.9, changeFrequency: "monthly" },
    { path: "/aim-2026", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pillars", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/pillars/global-markets",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/pillars/future-economies",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/pillars/nexgen",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "features-activities",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "features-activities/awards",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "features-activities/conference",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "features-activities/exhibition",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "features-activities/matchmaking",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "features-activities/mou",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/open-calls", priority: 0.8, changeFrequency: "monthly" },
    { path: "/press-releases", priority: 0.7, changeFrequency: "monthly" },
    { path: "/knowledge-hub", priority: 0.7, changeFrequency: "monthly" },
    { path: "/postshow-reports", priority: 0.7, changeFrequency: "monthly" },
    { path: "/articles", priority: 0.8, changeFrequency: "weekly" },
    { path: "/exhibitors-2025", priority: 0.7, changeFrequency: "monthly" },
    { path: "/speakers-2025", priority: 0.7, changeFrequency: "monthly" },
    { path: "/sponsors-2025", priority: 0.7, changeFrequency: "monthly" },
    { path: "/our-partners", priority: 0.7, changeFrequency: "monthly" },
  ].map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: new Date(),
    changeFrequency:
      p.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: p.priority,
  }));

  return [...staticPages, ...articleUrls];
}
