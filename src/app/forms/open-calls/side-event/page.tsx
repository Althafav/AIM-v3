// app/(routes)/register-interest/page.tsx

import { deliveryClient } from "@/modules/Globals";
import { cache } from "react";
import SideEventForm from "./SideEventForm";
import FormBanner from "@/components/UI/Banner/FormBanner";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("call_for_side_events___form")
    .depthParameter(2)
    .toPromise();
  return res.data.item.elements as any;
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const pageData = await getPageData();

  const params = await searchParams;
  const attendAs = params.attend ?? "";
  const mainsource = params.mainsource ?? "";
  const subsource = params.subsource ?? "";

  // ✅ Fetch directly (remove getJSON helper)
  const countriesRes = await fetch(
    "https://api.strategic.ae/api/generic/countries",
    { cache: "no-store" }
  );
  const CountriesData = (await countriesRes.json()) as {
    label: string;
    value: string;
  }[];

  const codesRes = await fetch(
    "https://api.strategic.ae/api/generic/countrycodes",
    { cache: "no-store" }
  );
  const CountriesCode = (await codesRes.json()) as {
    label: string;
    value: string;
  }[];

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

            {/* Client component will use CountriesData + CountriesCode */}
            <SideEventForm
              mainsource={mainsource}
              subsource={subsource}
              CountriesCode={CountriesCode}
              CountriesData={CountriesData}
              pageData={pageData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
