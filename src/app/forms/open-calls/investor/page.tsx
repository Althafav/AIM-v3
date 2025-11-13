// app/forms/open-calls/investor/page.tsx
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import { cache } from "react";
import InvestorForm from "./InvestorForm";
import FormBanner from "@/components/UI/Banner/FormBanner";

type CountryData = { label: string; value: string };

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("call_for_investor")
    .depthParameter(2)
    .toPromise();

  // Match your model shape used in the client
  return res.data.item.elements as any;
});

export async function generateMetadata() {
  const pageData = await getPageData();

  const title =
    pageData?.metadataPagetitle?.value ||
    pageData?.metadataMetatitle?.value ||
    "Investor – Open Call";
  const description = pageData?.metadataMetadescription?.value || "";

  const ogImage =
    "https://aimcongress.com/assets/logos/AIM Logo Vertical Blue in White.png";
  const canonical = `${SITE_URL}/forms/open-calls/investor`;

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: "https://aimcongress.com/assets/logos/AIM Logo Vertical Blue in White.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      images: [
        "https://aimcongress.com/assets/logos/AIM Logo Vertical Blue in White.png",
      ],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const pageData = await getPageData();
  const params = await searchParams;

  const mainsource = params.mainsource ?? "website";
  const subsource = params.subsource ?? "/";
  const attendAs = params.attend ?? ""; // (kept in case you read later)

  // Fetch countries & codes just like your reference
  const [countriesRes, codesRes] = await Promise.all([
    fetch("https://api.strategic.ae/api/generic/countries", {
      cache: "no-store",
    }),
    fetch("https://api.strategic.ae/api/generic/countrycodes", {
      cache: "no-store",
    }),
  ]);

  const CountriesData = (await countriesRes.json()) as CountryData[];
  const CountriesCode = (await codesRes.json()) as CountryData[];

  return (
    <div className="bg-white mb-10">
      <div className="max-w-5xl mx-auto px-5">
        <div className="register-interest-form-wrapper-2026">
          {/* Banner */}
          <FormBanner
            aimlogolink={pageData.aimlogolink?.value}
            aimlogoSrc={pageData.aimlogo.value[0]?.url}
            heading={pageData.bannerheading.value}
            date={pageData.date.value}
          />

          {/* Form (client) */}
          <InvestorForm
            mainsource={mainsource}
            subsource={subsource}
            CountriesCode={CountriesCode}
            CountriesData={CountriesData}
            pageData={pageData}
            attendAs={attendAs}
          />
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
