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
  const rawQuery = sp.query ?? "";
  const q = rawQuery.toLowerCase().trim();

  // Build unified index (blogs, etc.)
  const index = await buildSearchIndex();

  // Split query into words (ignore empty bits)
  const queryWords = q
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);

  // Preprocess items and score matches
  const results =
    queryWords.length === 0
      ? []
      : index
          .map((item: any) => {
            const heading = (item.heading ?? "").toLowerCase();

            // Strip HTML tags from content for searching
            const rawContent = item.content ?? "";
            const plainContent = rawContent
              .replace(/<[^>]+>/g, " ")
              .toLowerCase();

            const searchText = `${heading} ${plainContent}`;

            let score = 0;

            // Simple scoring: each word that appears adds score,
            // matches in heading are worth more.
            for (const word of queryWords) {
              if (!word) continue;

              if (heading.includes(word)) {
                score += 3; // heading match = stronger
              } else if (searchText.includes(word)) {
                score += 1; // content match
              }
            }

            return {
              ...item,
              _score: score,
            };
          })
          .filter((item: any) => item._score > 0)
          .sort((a: any, b: any) => b._score - a._score);

  return (
    <div className="bg-white">
      <Section>
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl font-semibold mb-6">Search</h1>

          <form method="GET" className="mb-8">
            <input
              type="text"
              name="query"
              defaultValue={rawQuery}
              placeholder="Search..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-300"
            />
          </form>

          {queryWords.length === 0 && (
            <p className="text-gray-500">Type something to search…</p>
          )}

          {queryWords.length > 0 && results.length === 0 && (
            <p className="text-gray-500">
              No results found for <strong>{rawQuery}</strong>
            </p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-10">
              {results.map((item: any, index: number) => (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" key={index}>
                  <div>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.heading}
                        className="w-full mb-3 rounded-3xl aspect-video object-cover"
                      />
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-xl font-semibold">{item.heading}</h3>

                    {item.content && (
                      <div
                        className="line-clamp-2 mt-2 text-sm text-gray-700"
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
