// app/search/page.tsx
import ButtonComponent from "@/components/UI/ButtonComponent";
import Section from "@/components/UI/Section";
import { buildSearchIndex } from "@/modules/searchIndex";

type SearchParams = { query?: string };

export const revalidate = 3600;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = (sp.query ?? "").toLowerCase().trim();

  // Directly build index (no HTTP, no URL parsing)
  const index = await buildSearchIndex();

  const results = q
    ? index.filter((item: any) =>
        (item.heading + " " + (item.content ?? "")).toLowerCase().includes(q)
      )
    : [];

  return (
    <div className=" bg-white">
      <Section>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Search</h1>

          <form method="GET" className="mb-8">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-300"
            />
          </form>

          {!q && <p className="text-gray-500">Type something to search…</p>}

          {q && results.length === 0 && (
            <p className="text-gray-500">
              No results found for <strong>{q}</strong>
            </p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-10">
              {results.map((item: any, index: number) => (
                <div className="grid grid-cols-3 gap-5" key={index}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.heading}
                      className="w-full mb-3 rounded-3xl aspect-video object-cover"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-xl font-semibold">{item.heading}</h3>
                    {item.content && (
                      <div
                        className=" line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    )}

                    <div className="mt-4">
                      <ButtonComponent link={item.url} name="Know more" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
