// app/forms/open-calls/investor/InvestorForm.tsx
"use client";

import JsLoader from "@/modules/JsLoader";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    onCaptcha?: () => void;
    onCaptchaExpired?: () => void;
  }
}

interface CountryData {
  label: string;
  value: string;
}

interface Form2026 {
  bannerimage: { value: { url: string }[] };
  aimlogolink: { value: string };
  aimlogo: { value: { url: string }[] };
  bannerheading: { value: string };
  date: { value: string };
  aboutheading: { value: string };
  aboutdescription: { value: string };
  formsubmit: { value: string };
  leadtype: { value: string };
  metadataPagetitle?: { value: string };
  metadataMetatitle?: { value: string };
  metadataMetadescription?: { value: string };
}

interface InvestorData {
  investorTypes: string[];
  investmentTypes: string[];
  investmentSize: string;
  sectors: string[];
  sectorsOtherText: string;
  geography: string[];
  geoOtherText: string;
  participationInterest: string[];
  attendedBefore: string;
}

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: CountryData[];
  CountriesData: CountryData[];
  pageData: Form2026;
  attendAs?: string;
}

export default function InvestorForm({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
}: Props) {
  const [investorData, setInvestorData] = useState<InvestorData>({
    investorTypes: [],
    investmentTypes: [],
    investmentSize: "",
    sectors: [],
    sectorsOtherText: "",
    geography: [],
    geoOtherText: "",
    participationInterest: [],
    attendedBefore: "",
  });

  const [confirmedDisclaimer, setConfirmedDisclaimer] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);

  // Load your custom JS (kept same path as your original)
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/open-calls/call-investor.js`);
  }, []);

  // reCAPTCHA callbacks (to match your reference behavior)
  useEffect(() => {
    window.onCaptcha = () => setCaptchaOk(true);
    window.onCaptchaExpired = () => setCaptchaOk(false);
  }, []);

  const handleMultiChange =
    (field: keyof InvestorData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInvestorData((prev) => {
        const arr = (prev[field] as string[]) ?? [];
        const next = e.target.checked
          ? [...arr, val]
          : arr.filter((x) => x !== val);
        return { ...prev, [field]: next as any };
      });
    };

  const handleSingleChange =
    (field: keyof InvestorData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInvestorData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  if (!pageData) return null;

  const investorTypes = [
    "Private Equity Firm",
    "Family Office",
    "Corporate Investor",
    "Sovereign Wealth Fund",
    "Institutional Investor (Pension Fund, Bank, etc.)",
    "Development Finance Institution",
    "Impact / ESG-Focused Investor",
    "Public Investment Fund",
  ];

  const investmentTypes = [
    "Equity Investments",
    "Debt Financing / Loans",
    "Public Equity",
    "Private Equity",
    "Project Finance",
    "Blended Finance",
    "Public / Private Partnership",
    "Mergers & Acquisitions",
    "Green / Sustainable Finance",
  ];

  const sizes = ["USD 100K – 1M", "USD 1M – 10M", "USD 10M – 100M", "USD 100M+"];

  const sectors = [
    "Foreign Direct Investment (FDI Projects)",
    "Advanced Manufacturing and Industrial Development",
    "Smart Cities / Urban Infrastructure/ Transport",
    "Fintech / Future Finance",
    "Digital Economy (AI, Big Data, Tech Infrastructure)",
    "Climate Tech / Green Energy / ESG",
    "Healthcare / Biotech",
    "Agribusiness/ Food & AgriTech",
    "Education / Workforce Development",
    "Tourism / Creative Economy",
    "Public-Private Partnerships (PPP) / Government – Led Initiatives",
  ];

  const geos = [
    "Global",
    "GCC",
    "Middle East & North Africa (MENA)",
    "Sub-Saharan Africa",
    "South Asia (India, Pakistan, etc.)",
    "Southeast Asia (ASEAN)",
    "East Asia (China, Korea, Japan)",
    "Europe",
    "Latin America",
    "North America",
  ];

  return (
    <div className="form-2026">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-gray-200 p-4 md:p-6">
          {/* About */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {pageData.aboutheading.value}
            </h2>
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: pageData.aboutdescription.value,
              }}
            />
          </div>

          {/* Form */}
          <form
            method="POST"
            action="//ac.strategic.ae/proc.php"
            id="_form_394_"
            noValidate
            className="mt-8 grid grid-cols-1 gap-5"
          >
            {/* Hidden fields to match your backend */}
            <input type="hidden" name="u" value="394" />
            <input type="hidden" name="f" value="394" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <input
              type="hidden"
              name="or"
              value="87dd3af2187abe9a07709ed7f1daacda"
            />
            <input
              type="hidden"
              name="field[38]"
              value={pageData.formsubmit.value}
            />
            <input type="hidden" name="leadType" value={pageData.leadtype.value} />
            <textarea
              id="field[378]"
              name="field[378]"
              className="hidden"
              readOnly
              value={JSON.stringify(investorData)}
            />
            <input type="hidden" name="field[328]" value={mainsource} />
            <input type="hidden" name="field[329]" value={subsource} />

            {/* Basic Information */}
            <h4 className="mt-2 text-lg font-semibold text-gray-900">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                placeholder="First Name *"
                required
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                placeholder="Last Name *"
                required
              />
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                placeholder="Email Address *"
                required
              />
              <input
                type="text"
                name="field[23]"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                placeholder="Job Title *"
                required
              />
              <input
                type="text"
                id="customer_account"
                name="customer_account"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                placeholder="Organization / Fund / Investment Entity Name"
                required
              />

              <select
                name="field[3]"
                id="field[3]"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                required
              >
                <option value="">Country of Headquarters *</option>
                {CountriesData.map((country, index) => (
                  <option key={`country-${index}`} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>

              {/* Phone */}
              <div className="md:col-span-2">
                <div className="flex gap-3">
                  <select
                    name="phoneCode"
                    required
                    className="w-40 rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                  >
                    <option value="">Code</option>
                    {CountriesCode.map((code, i) => (
                      <option key={i} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="field[12]"
                    placeholder="Mobile Phone *"
                    required
                    className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <input
                type="text"
                name="Linkedin"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 md:col-span-2"
                placeholder="LinkedIn Profile / Website"
              />
            </div>

            {/* Investor Type */}
            <div>
              <label className="block text-sm text-gray-700">
                Please select your investor type (select all that apply):
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {investorTypes.map((type, i) => (
                  <label
                    key={i}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                  >
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="checkbox"
                      name="investorType"
                      value={type}
                      onChange={handleMultiChange("investorTypes")}
                      checked={investorData.investorTypes.includes(type)}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Investment Profile */}
            <div>
              <label className="block text-sm text-gray-700">
                What types of investments do you typically make?
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {investmentTypes.map((inv) => (
                  <label
                    key={inv}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                  >
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="checkbox"
                      name="investmentTypes"
                      value={inv}
                      onChange={handleMultiChange("investmentTypes")}
                      checked={investorData.investmentTypes.includes(inv)}
                    />
                    <span className="text-sm">{inv}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Typical Investment Size */}
            <div>
              <label className="block text-sm text-gray-700">
                Typical Investment Size:
              </label>
              <div className="mt-2 flex flex-wrap gap-4">
                {sizes.map((size, i) => (
                  <label key={i} className="inline-flex items-center gap-2">
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="radio"
                      name="investmentSize"
                      value={size}
                      onChange={handleSingleChange("investmentSize")}
                      checked={investorData.investmentSize === size}
                      id={`size_${i}`}
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sectors */}
            <div>
              <label className="block text-sm text-gray-700">
                Sectors of Interest (select up to 5):
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {sectors.map((sec, i) => (
                  <label
                    key={i}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                  >
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="checkbox"
                      name="sectors"
                      value={sec}
                      id={`sector_${i}`}
                      onChange={handleMultiChange("sectors")}
                      checked={investorData.sectors.includes(sec)}
                    />
                    <span className="text-sm">{sec}</span>
                  </label>
                ))}

                <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                  <input
                    className="h-4 w-4 rounded border-gray-300"
                    type="checkbox"
                    name="sectors"
                    value="Other"
                    id="sector_other"
                    onChange={handleMultiChange("sectors")}
                    checked={investorData.sectors.includes("Other")}
                  />
                  <span className="text-sm">Other:</span>
                </label>
              </div>

              {investorData.sectors.includes("Other") && (
                <div className="mt-2 pl-2">
                  <input
                    type="text"
                    name="sectorsOtherText"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                    placeholder="Please specify up to 5"
                    onChange={handleSingleChange("sectorsOtherText")}
                    value={investorData.sectorsOtherText}
                  />
                </div>
              )}
            </div>

            {/* Geographic Focus */}
            <div>
              <label className="block text-sm text-gray-700">
                Geographic Investment Focus:
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {geos.map((reg, i) => (
                  <label
                    key={i}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                  >
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="checkbox"
                      name="geography"
                      value={reg}
                      id={`geo_${i}`}
                      onChange={handleMultiChange("geography")}
                      checked={investorData.geography.includes(reg)}
                    />
                    <span className="text-sm">{reg}</span>
                  </label>
                ))}

                <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                  <input
                    className="h-4 w-4 rounded border-gray-300"
                    type="checkbox"
                    name="geography"
                    value="Other"
                    id="geo_other"
                    onChange={handleMultiChange("geography")}
                    checked={investorData.geography.includes("Other")}
                  />
                  <span className="text-sm">Other:</span>
                </label>
              </div>

              {investorData.geography.includes("Other") && (
                <div className="mt-2 pl-2">
                  <input
                    type="text"
                    name="geoOtherText"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                    placeholder="Please specify"
                    onChange={handleSingleChange("geoOtherText")}
                    value={investorData.geoOtherText}
                  />
                </div>
              )}
            </div>

            {/* Target Countries (free text) */}
            <div>
              <label className="block text-sm text-gray-700">
                Are there specific countries you are currently targeting for
                investment? (Please list up to 5)
              </label>
              <input
                type="text"
                name="targetCountry"
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
                placeholder="e.g., United Arab Emirates, Saudi Arabia, India, Egypt, Germany"
              />
            </div>

            {/* Participation Preferences */}
            <div>
              <label className="block text-sm text-gray-700">
                I am interested in the following (select all that apply):
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {[
                  "1:1 Meetings with Governments / IPAs",
                  "Investment Pitch Sessions",
                  "Closed-Door Investor Roundtables",
                  "Speaking in an Investor Panel",
                  "Co-hosting or Co-sponsoring an investor-focused side event",
                  "Access to curated Deal Room",
                ].map((pref, i) => (
                  <label
                    key={i}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                  >
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="checkbox"
                      name="participationInterest"
                      value={pref}
                      onChange={handleMultiChange("participationInterest")}
                      checked={investorData.participationInterest.includes(pref)}
                    />
                    <span className="text-sm">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Prior Attendance */}
            <div>
              <label className="block text-sm text-gray-700">
                Have you attended AIM Congress before?
              </label>
              <div className="mt-2 flex flex-wrap gap-4">
                {["Yes", "No"].map((ans) => (
                  <label key={ans} className="inline-flex items-center gap-2">
                    <input
                      className="h-4 w-4 rounded border-gray-300"
                      type="radio"
                      name="attendedBefore"
                      value={ans}
                      onChange={handleSingleChange("attendedBefore")}
                      checked={investorData.attendedBefore === ans}
                    />
                    <span className="text-sm">{ans}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hidden interest field – Investor (pre-checked) */}
            <div className="hidden">
              <input
                id="field_228Investor"
                type="checkbox"
                name="field[228][]"
                value="Investor"
                defaultChecked
              />
            </div>

            {/* Declaration */}
            <div>
              <label className="inline-flex items-start gap-3">
                <input
                  className="mt-1 h-4 w-4 rounded border-gray-300"
                  type="checkbox"
                  name="confirmation"
                  id="confirmation"
                  onChange={(e) => setConfirmedDisclaimer(e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  I confirm that I am an active investor or represent an
                  investment entity. I understand investor passes are subject to
                  verification.
                </span>
              </label>
            </div>

            {/* reCAPTCHA */}
            <div className="my-4">
              <div
                className="g-recaptcha"
                data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                data-callback="onCaptcha"
                data-expired-callback="onCaptchaExpired"
              />
            </div>

            {/* Submit */}
            <div className="mt-2">
              <button
                id="_form_394_submit"
                type="submit"
                disabled={!confirmedDisclaimer || !captchaOk}
                className={`rounded-full px-5 py-2 text-white transition ${
                  confirmedDisclaimer && captchaOk
                    ? "bg-gray-900 hover:bg-black"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <span>Submit Application</span>
              </button>
            </div>
          </form>
          {/* /Form */}
        </div>
      </div>
    </div>
  );
}
