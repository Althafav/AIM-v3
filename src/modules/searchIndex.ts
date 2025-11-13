// lib/searchIndex.ts
import { deliveryClient } from "@/modules/Globals";
import { slugify } from "./Helper";

export async function buildSearchIndex() {
  // === BLOGS from blog_page (your snippet) ===
  const blogsRes = await deliveryClient
    .item("blog_page")
    .depthParameter(3)
    .toPromise();

  const blogsData = blogsRes.data.item.elements as any;
  const blogItems = (blogsData?.articles_items?.linkedItems ?? []) as any[];

  const blogIndex = blogItems.map((blog: any) => ({
    id: blog.system.id,
    type: "blog",
    heading: blog.elements.heading.value,
    content: blog.elements.content?.value ?? "",
    url: `/articles/${slugify(blog.elements.heading.value)}`, // change if your route is different
    image: blog.elements.image?.value?.[0]?.url ?? null,
  }));

  const index = [...blogIndex];

  return index;
}
