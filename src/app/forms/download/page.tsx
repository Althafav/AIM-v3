// app/register/page.tsx
import { cache } from "react";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import DownloadInterestForm from "./DownloadInterestForm";
import Link from "next/link";
import FormBanner from "@/components/UI/Banner/FormBanner";
import { buildMetadata } from "@/modules/seo";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("form___register_interest")
    .depthParameter(4)
    .toPromise();

  return res.data.item.elements as any;
});

export async function generateMetadata() {
  const data = await getPageData();
  return buildMetadata({
    title: data.metadata__pagetitle?.value,
    description: data.metadata__metadescription?.value,
    image: `${SITE_URL}assets/logos/AIM Logo Vertical Blue in White.png`,
    canonical: `${SITE_URL}forms/download`,
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const mainsource = params.mainsource ?? "/";
  const subsource = params.subsource ?? "/";
  const type = params.type ?? "";
  const id = params.id ?? "";

  const pageData = await getPageData();

  const [countriesRes, codesRes] = await Promise.all([
    fetch("https://api.strategic.ae/api/generic/countries", {
      cache: "no-store",
    }),
    fetch("https://api.strategic.ae/api/generic/countrycodes", {
      cache: "no-store",
    }),
  ]);

  const CountriesData = (await countriesRes.json()) as {
    label: string;
    value: string;
  }[];
  const CountriesCode = (await codesRes.json()) as {
    label: string;
    value: string;
  }[];

  let PDFLink = "";
  if (id && (type === "postshow-report" || type === "brochure")) {
    try {
      const itemRes = await deliveryClient
        .items()
        .equalsFilter("system.id", id)
        .toPromise();
      const first = (itemRes.data.items || [])[0] as any;
      PDFLink = first?.elements?.reportpdf?.value?.[0]?.url || "";
    } catch {
      PDFLink = "";
    }
  }

  return (
    <>
      <div className="bg-white ">
        <div>
          <div className="max-w-5xl mx-auto px-5">
            <div className="register-interest-form-wrapper-2026">
              <FormBanner
                aimlogolink={pageData.aimlogolink?.value}
                aimlogoSrc={pageData.aimlogo.value[0]?.url}
                heading={pageData.bannerheading.value}
                date={pageData.date.value}
              />

              <DownloadInterestForm
                mainsource={mainsource}
                subsource={subsource}
                CountriesCode={CountriesCode}
                CountriesData={CountriesData}
                type={type}
                PDFLink={PDFLink}
                pageData={pageData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
