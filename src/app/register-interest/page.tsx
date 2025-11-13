// app/(routes)/register-interest/page.tsx

import { deliveryClient, SITE_URL } from "@/modules/Globals";

import { cache } from "react";
import RegisterInterestForm from "./RegisterInterestForm";
import FormBanner from "@/components/UI/Banner/FormBanner";
import { buildMetadata } from "@/modules/seo";
import PageLoader from "@/components/globals/PageLoader";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("form___register_interest")
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
    canonical: `${SITE_URL}register-interest`,
  });
}

async function getJSON<T>(url: string): Promise<T> {
  // Server-side fetch with no caching because this is dynamic data
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return (await res.json()) as T;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const pageData = await getPageData();

  // Pull from query string (e.g., ?attendAs=Speaker&mainsource=...&subsource=...)
  const params = await searchParams;
  const attendAs = params.attend ?? "";
  const mainsource = params.mainsource ?? "";
  const subsource = params.subsource ?? "";

  // Countries and codes from your API
  const CountriesData = await getJSON<{ label: string; value: string }[]>(
    "https://api.strategic.ae/api/generic/countries"
  );
  const CountriesCode = await getJSON<{ label: string; value: string }[]>(
    "https://api.strategic.ae/api/generic/countrycodes"
  );

  if (!pageData) return <PageLoader />;

  return (
    <div className="bg-white mb-10">
      <div>
        <div className="max-w-5xl mx-auto px-5">
          <div className="register-interest-form-wrapper-2026">
            <FormBanner
              aimlogolink={pageData.aimlogolink?.value}
              aimlogoSrc={pageData.aimlogo.value[0]?.url}
              heading={pageData.bannerheading.value}
              date={pageData.date.value}
            />

            {/* Client component handles all browser logic */}
            <RegisterInterestForm
              pageData={pageData}
              CountriesData={CountriesData}
              CountriesCode={CountriesCode}
              attendAs={attendAs}
              mainsource={mainsource}
              subsource={subsource}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
