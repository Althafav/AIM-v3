// app/api/partners/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { deliveryClient } from "@/modules/Globals";

const cleanContent = (html: string) => html.replace(/<\/?p[^>]*>/g, "");

type Logo = {
  name: string;
  type: string;
  description: string | null;
  url: string;
};

type PartnerOut = {
  id: string;
  name: string;
  website: string;
  content: string;
  category: string | string[];
  logo: string;
};

const ORDER = [
  "Supporting Partner",
  "Conference Participants",
  "Knowledge Partner",
  "Event Partner",
  "Investment Community Partner",
  "Strategic Partner",
  "Community Partner",
] as const;

const fetchPortfolio = async (codename: string) => {
  const { data } = await deliveryClient
    .item(codename)
    .depthParameter(4)
    .toPromise();
  // Return the elements bag to keep access paths the same as your original code
  return (data?.item?.elements ?? {}) as any;
};

const mapOne = (item: any): PartnerOut => {
  const logo0 = item?.image?.value?.[0] ?? {};
  return {
    id: item?.elements.system?.id ?? "",
    name: item?.elements.name?.value ?? "",
    website: item?.elements.link?.value ?? "",
    content: item?.elements.content?.value ?? "",
    category: item?.elements.category?.value ?? [],
    logo: item?.elements.image.value[0]?.url ?? ''
  };
};

const categorize = (items: any[]) => {
  const buckets: Record<string, PartnerOut[]> = {};

  items.forEach((raw) => {
    const cats: any[] = raw?.elements.category?.value ?? [];
    const mapped = mapOne(raw);
    cats.forEach((c) => {
      const key = c?.name ?? "Uncategorized";
      (buckets[key] ||= []).push(mapped);
    });
    // Handle items with no category at all
    if (cats.length === 0) (buckets["Uncategorized"] ||= []).push(mapped);
  });

  // Keep your preferred order, then append any remaining categories alphabetically
  const remaining = Object.keys(buckets)
    .filter((k) => !ORDER.includes(k as any))
    .sort();
  const order = [...ORDER, ...remaining];

  return order.map((cat) => ({
    Category: cat,
    Items: buckets[cat] ?? [],
  }));
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const [
      ConferenceData,
      FDIData,
      GTData,
      GMData,
      FCData,
      DEData,
      FFData,
      SMEData,
    ] = await Promise.all([
      fetchPortfolio("conference_participants_partners_2025"),
      fetchPortfolio("fdi_portfolio"),
      fetchPortfolio("global_trade_portfolio"),
      fetchPortfolio("advanced_manufacturing_portfolio"),
      fetchPortfolio("future_cities_porfolio"),
      fetchPortfolio("digital_economy_portfolio"),
      fetchPortfolio("future_finance_portfolio"),
      fetchPortfolio("entrepreneur_portfolio"),
    ]);

    // Keep the exact property names you used originally
    const allItems: any[] = [
      ...(ConferenceData?.items?.linkedItems ?? []),
      ...(FDIData?.currentparntersitems?.linkedItems ?? []),
      ...(GTData?.currentparntersitems?.linkedItems ?? []),
      ...(GMData?.currentparntersitems?.linkedItems ?? []),
      ...(FCData?.currentparntersitems?.linkedItems ?? []),
      ...(DEData?.currentparntersitems?.linkedItems ?? []),
      ...(FFData?.keyplayersitems?.linkedItems ?? []),
      ...(SMEData?.keyplayersitems?.linkedItems ?? []),
    ];

    if (id) {
      const found = allItems.find((it) => it?.system?.id === id);
      if (!found) {
        return NextResponse.json(
          { success: false, message: "Item not found" },
          { status: 404 }
        );
      }
      const one = mapOne(found);
      return NextResponse.json({
        success: true,
        data: {
          ...one,
          content: cleanContent(one.content),
        },
      });
    }

    const categorized = categorize(allItems);
    return NextResponse.json(categorized);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
