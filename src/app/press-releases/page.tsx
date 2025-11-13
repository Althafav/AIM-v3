// app/articles/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FaYoutube } from "react-icons/fa";
import ShareButton from "@/components/UI/ShareButton";
import { FiSearch } from "react-icons/fi";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { slugify } from "@/modules/Helper";

const PAGE_SIZE = 9;

type SearchParams = { page?: string; q?: string };

export const revalidate = 60;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page ?? 1));
  const title = page > 1 ? `Press Releases – Page ${page}` : "Articles";
  const url = `${SITE_URL}/press-releases${page > 1 ? `?page=${page}` : ""}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description:
      "Latest articles and updates from AIM. Explore insights, news, and event stories.",
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description:
        "Latest articles and updates from AIM. Explore insights, news, and event stories.",
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const pageRes = await deliveryClient
    .item("press_release_page")
    .depthParameter(3)
    .toPromise();
  const pageData = pageRes.data.item.elements as any;

  const all = (pageData?.pressreleaseitem?.linkedItems ?? []) as any[];

  // Normalize + sort (newest first)
  const items = all
    .map((i) => ({
      id: i.system?.id,
      slug: i.elements.slug?.value,
      title: i.elements.heading?.value,
      image: i.elements.image?.value?.[0]?.url,
      lastModified: i.system?.lastModified
        ? new Date(i.system.lastModified)
        : null,
      excerpt: i.elements.excerpt?.value ?? "",
    }))
    .filter((x) => x.title)
    .sort((a, b) => {
      const ta = a.lastModified?.getTime() ?? 0;
      const tb = b.lastModified?.getTime() ?? 0;
      return tb - ta;
    });

  const q = (sp?.q ?? "").toString().trim().toLowerCase();

  const filtered = q
    ? items.filter(
        (i) =>
          (i.title?.toLowerCase().includes(q) ?? false) ||
          (i.excerpt?.toLowerCase().includes(q) ?? false)
      )
    : items;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(Math.max(1, Number(sp?.page ?? 1)), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="bg-white ">
      <div className="container mx-auto py-10">
        <div className="bg-black rounded-3xl mb-10">
          <div className="px-6 py-7 md:px-10 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left: Heading + Subheading */}
              <div className="max-w-2xl">
                <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                  {pageData.bannerheading.value}
                </h1>
                <p className="text-white/80 tracking-tight leading-snug mb-4">
                  {pageData.bannersubheading.value}
                </p>

                {/* Search */}
                <form
                  method="GET"
                  action="/press-release"
                  className="relative w-full sm:w-80"
                  aria-label="Search press release"
                >
                  <label htmlFor="q" className="sr-only">
                    Search articles
                  </label>
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <FiSearch size={18} className="text-gray-500" />
                  </span>
                  <input
                    id="q"
                    name="q"
                    type="search"
                    placeholder="Search ..."
                    defaultValue={typeof sp?.q === "string" ? sp?.q : ""}
                    className="w-full rounded-full bg-[#2e2e2e] text-white placeholder:text-gray-500
                       pl-9 pr-3 py-2.5 outline-none  ring-white/10
                       "
                  />
                </form>
              </div>

              {/* Right: Search + Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4 w-full md:w-auto">
                {/* Actions */}
                <div className="flex items-center gap-3 justify-end">
                  <ShareButton />
                  <Link
                    href={pageData.youtubelink.value}
                    target="_blank"
                    rel="noopener"
                    aria-label="Open our YouTube channel"
                    className="inline-flex"
                  >
                    <FaYoutube className="youtube-icon" color="red" size={36} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="mb-8">
          <p className="text-gray-600 mt-1">
            {total} article{total !== 1 ? "s" : ""}
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6 will-change-transform">
          {pageItems.map((post, index) => (
            <article
              key={post.id}
              className="col-span-12 sm:col-span-6 lg:col-span-3 group rounded-xl overflow-hidden border border-gray-200 bg-white transform-gpu"
            >
              <Link href={`/press-releases/${slugify(post.title)}`} className="block">
                <div className="aspect-video relative overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      quality={75}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100" />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight text-gray-900 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.lastModified && (
                    <time
                      className="block text-xs text-gray-500 mt-3"
                      dateTime={post.lastModified.toISOString()}
                    >
                      {post.lastModified.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            current={current}
            total={totalPages}
            basePath="/press-releases"
            className="mt-10"
          />
        )}
      </div>
    </div>
  );
}

/* ---------- Inline Pagination Component ---------- */
function Pagination({
  current,
  total,
  basePath,
  className = "",
}: {
  current: number;
  total: number;
  basePath: string;
  className?: string;
}) {
  // Create a compact window around current page
  const windowSize = 2;
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter(
    (p) =>
      p === 1 ||
      p === total ||
      (p >= current - windowSize && p <= current + windowSize)
  );

  const withEllipses: (number | "...")[] = [];
  for (let i = 0; i < pages.length; i++) {
    if (i === 0) withEllipses.push(pages[i]);
    else {
      const prev = pages[i - 1];
      const curr = pages[i];
      if (curr - prev > 1) withEllipses.push("...", curr);
      else withEllipses.push(curr);
    }
  }

  const linkFor = (p: number) =>
    p === 1 ? `${basePath}` : `${basePath}?page=${p}`;

  return (
    <nav
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      <Link
        href={current > 1 ? linkFor(current - 1) : "#"}
        aria-disabled={current === 1}
        className={`px-3 py-2 rounded-lg border ${
          current === 1
            ? "text-gray-300 border-gray-200 pointer-events-none"
            : "text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
      >
        Prev
      </Link>

      {withEllipses.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={linkFor(p)}
            aria-current={p === current ? "page" : undefined}
            className={`px-3 py-2 rounded-lg border ${
              p === current
                ? "bg-gray-900 text-white border-gray-900"
                : "text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={current < total ? linkFor(current + 1) : "#"}
        aria-disabled={current === total}
        className={`px-3 py-2 rounded-lg border ${
          current === total
            ? "text-gray-300 border-gray-200 pointer-events-none"
            : "text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
