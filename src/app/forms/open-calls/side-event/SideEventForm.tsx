"use client";

import JsLoader from "@/modules/JsLoader";
import Link from "next/link";
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
}

interface SideEventData {
  eventTitle: string;
  eventType: string;
  eventTypeOther: string;
  eventTopic: string;
  eventDescription: string;
  attendeeRange: string;
  targetAudience: string[];
  targetAudienceOther: string;
  setup: string[];
  setupOther: string;
  interpretation: string;
  interpretationLanguages: string;
  priorEvent: string;
  additionalNotes: string;
}

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: CountryData[];
  CountriesData: CountryData[];
  pageData: Form2026;
}

export default function SideEventForm({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
}: Props) {
  const [sideEventData, setSideEventData] = useState<SideEventData>({
    eventTitle: "",
    eventType: "",
    eventTypeOther: "",
    eventTopic: "",
    eventDescription: "",
    attendeeRange: "",
    targetAudience: [],
    targetAudienceOther: "",
    setup: [],
    setupOther: "",
    interpretation: "",
    interpretationLanguages: "",
    priorEvent: "",
    additionalNotes: "",
  });
  const [confirmedDisclaimer, setConfirmedDisclaimer] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/open-calls/call-for-sideEvents.js`);
  }, []);

  useEffect(() => {
    window.onCaptcha = () => setCaptchaOk(true);
    window.onCaptchaExpired = () => setCaptchaOk(false);
  }, []);

  const handleMultiChange =
    (field: keyof SideEventData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSideEventData((prev) => {
        const arr = (prev[field] as string[]) ?? [];
        const next = e.target.checked
          ? [...arr, val]
          : arr.filter((x) => x !== val);
        return { ...prev, [field]: next as any };
      });
    };

  const handleSingleChange =
    (field: keyof SideEventData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSideEventData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const audienceOptions = [
    "Government / Policy Makers",
    "Investors",
    "Corporates",
    "SMEs / Startups",
    "Trade Organizations",
  ];

  const setupOptions = [
    "Boardroom Style",
    "Theatre Style",
    "Round Tables",
    "Reception Style",
  ];

  if (!pageData) return null;

  return (
    <div className="form-2026">
      <div className="mx-auto max-w-7xl">
        <div className="register-interest-form-wrapper-2026">
          {/* Form */}
          <div className="">
            <form
              method="POST"
              action="//ac.strategic.ae/proc.php"
              id="_form_394_"
              noValidate
              className="rounded-2xl border border-gray-200 p-4 md:p-6"
            >
              {/* Hidden fields */}
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
              <input
                type="hidden"
                name="leadType"
                value={pageData.leadtype.value}
              />
              <textarea
                id="field[375]"
                name="field[375]"
                className="hidden"
                value={JSON.stringify(sideEventData)}
                readOnly
              />
              <input type="hidden" name="field[328]" value={mainsource} />
              <input type="hidden" name="field[329]" value={subsource} />

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

              {/* Grid */}
              <div className="mt-8 grid grid-cols-1 gap-5">
                <h4 className="mt-4 text-lg font-semibold text-gray-900">
                  Organizer Details
                </h4>

                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    placeholder="First Name *"
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    placeholder="Last Name *"
                    required
                  />
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    placeholder="Email Address *"
                    required
                  />
                  <input
                    type="text"
                    name="field[23]"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    placeholder="Job Title *"
                    required
                  />
                  <input
                    type="text"
                    id="customer_account"
                    name="customer_account"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    placeholder="Organization / Company"
                    required
                  />

                  <select
                    name="field[3]"
                    id="field[3]"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    required
                  >
                    <option value="">Country of Operation *</option>
                    {CountriesData.map((country, index) => (
                      <option key={`country-${index}`} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>

                  {/* Phone */}
                  <div className="md:col-span-1">
                    <div className="flex gap-3">
                      <select
                        name="phoneCode"
                        required
                        className="w-40 rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
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
                        className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    name="Linkedin"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    placeholder="LinkedIn Profile / Website"
                  />
                </div>

                {/* Side Event Proposal */}
                <h4 className="mt-6 text-lg font-semibold text-gray-900">
                  Side Event Proposal
                </h4>

                <div>
                  <label className="block text-sm text-gray-700">
                    Proposed Event Title:
                  </label>
                  <input
                    type="text"
                    id="field[374]"
                    name="field[374]"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    onChange={handleSingleChange("eventTitle")}
                    value={sideEventData.eventTitle}
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm text-gray-700">
                    Event Type (select one):
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {[
                      "Roundtable",
                      "Closed-Door Meeting",
                      "Forum",
                      "Networking Reception",
                      "Other",
                    ].map((type) => (
                      <label
                        key={type}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          className="h-4 w-4 rounded border-gray-300"
                          type="radio"
                          name="eventType"
                          value={type}
                          onChange={handleSingleChange("eventType")}
                          checked={sideEventData.eventType === type}
                        />
                        <span className="text-sm">
                          {type === "Other" ? "Other:" : type}
                        </span>
                      </label>
                    ))}
                  </div>

                  {sideEventData.eventType === "Other" && (
                    <div className="mt-2 pl-2">
                      <input
                        type="text"
                        name="eventTypeOther"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                        placeholder="Please specify"
                        onChange={handleSingleChange("eventTypeOther")}
                        value={sideEventData.eventTypeOther}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Proposed Topic / Theme:
                  </label>
                  <input
                    type="text"
                    name="eventTopic"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    onChange={handleSingleChange("eventTopic")}
                    value={sideEventData.eventTopic}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Event Description (150–300 words):
                  </label>
                  <textarea
                    name="eventDescription"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    onChange={handleSingleChange("eventDescription")}
                    value={sideEventData.eventDescription}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Estimated Number of Attendees:
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {["Up to 30", "30–50", "50–100", "100+"].map((range, i) => (
                      <label key={i} className="inline-flex items-center gap-2">
                        <input
                          className="h-4 w-4 rounded border-gray-300"
                          type="radio"
                          name="attendeeRange"
                          value={range}
                          onChange={handleSingleChange("attendeeRange")}
                          checked={sideEventData.attendeeRange === range}
                        />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm text-gray-700">
                    Target Audience:
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {audienceOptions.map((aud, i) => (
                      <label
                        key={i}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                      >
                        <input
                          className="h-4 w-4 rounded border-gray-300"
                          type="checkbox"
                          name="targetAudience"
                          value={aud}
                          onChange={handleMultiChange("targetAudience")}
                          checked={sideEventData.targetAudience.includes(aud)}
                        />
                        <span className="text-sm">{aud}</span>
                      </label>
                    ))}

                    <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                      <input
                        className="h-4 w-4 rounded border-gray-300"
                        type="checkbox"
                        name="targetAudience"
                        value="Other"
                        onChange={handleMultiChange("targetAudience")}
                        checked={sideEventData.targetAudience.includes("Other")}
                      />
                      <span className="text-sm">Other:</span>
                    </label>
                  </div>

                  {sideEventData.targetAudience.includes("Other") && (
                    <div className="mt-2 pl-2">
                      <input
                        type="text"
                        name="targetAudienceOther"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                        placeholder="Please specify"
                        onChange={handleSingleChange("targetAudienceOther")}
                        value={sideEventData.targetAudienceOther}
                      />
                    </div>
                  )}
                </div>

                {/* Logistical Requirements */}
                <h4 className="mt-6 text-lg font-semibold text-gray-900">
                  Logistical Requirements
                </h4>

                <div>
                  <label className="block text-sm text-gray-700">
                    What type of setup will you require?
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {setupOptions.map((setup, i) => (
                      <label
                        key={i}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2"
                      >
                        <input
                          className="h-4 w-4 rounded border-gray-300"
                          type="checkbox"
                          name="setup"
                          value={setup}
                          onChange={handleMultiChange("setup")}
                          checked={sideEventData.setup.includes(setup)}
                        />
                        <span className="text-sm">{setup}</span>
                      </label>
                    ))}

                    <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                      <input
                        className="h-4 w-4 rounded border-gray-300"
                        type="checkbox"
                        name="setup"
                        value="Other"
                        onChange={handleMultiChange("setup")}
                        checked={sideEventData.setup.includes("Other")}
                      />
                      <span className="text-sm">Other:</span>
                    </label>
                  </div>

                  {sideEventData.setup.includes("Other") && (
                    <div className="mt-2 pl-2">
                      <input
                        type="text"
                        name="setupOther"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                        placeholder="Please specify"
                        onChange={handleSingleChange("setupOther")}
                        value={sideEventData.setupOther}
                      />
                    </div>
                  )}
                </div>

                {/* Interpretation */}
                <div>
                  <label className="block text-sm text-gray-700">
                    Do you require interpretation or multilingual support?
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {["Yes", "No"].map((ans) => (
                      <label
                        key={ans}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          className="h-4 w-4 rounded border-gray-300"
                          type="radio"
                          name="interpretation"
                          value={ans}
                          onChange={handleSingleChange("interpretation")}
                          checked={sideEventData.interpretation === ans}
                        />
                        <span className="text-sm">{ans}</span>
                      </label>
                    ))}
                  </div>

                  {sideEventData.interpretation === "Yes" && (
                    <div className="mt-2 pl-2">
                      <input
                        type="text"
                        name="interpretationLanguages"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                        placeholder="Please list languages"
                        onChange={handleSingleChange("interpretationLanguages")}
                        value={sideEventData.interpretationLanguages}
                      />
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <h4 className="mt-6 text-lg font-semibold text-gray-900">
                  Additional Information
                </h4>

                <div>
                  <label className="block text-sm text-gray-700">
                    Have you organized a side event at AIM Congress before?
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {["Yes", "No"].map((ans) => (
                      <label
                        key={ans}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          className="h-4 w-4 rounded border-gray-300"
                          type="radio"
                          name="priorEvent"
                          value={ans}
                          onChange={handleSingleChange("priorEvent")}
                          checked={sideEventData.priorEvent === ans}
                        />
                        <span className="text-sm">{ans}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Additional Notes or Special Requests (optional):
                  </label>
                  <textarea
                    name="additionalNotes"
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-900"
                    onChange={handleSingleChange("additionalNotes")}
                    value={sideEventData.additionalNotes}
                  />
                </div>

                {/* Hidden interest field (pre-checked) */}
                <div className="hidden">
                  <input
                    id="field_228Side Event Organizer"
                    type="checkbox"
                    name="field[228][]"
                    value="Side Event Organizer"
                    defaultChecked
                  />
                </div>

                {/* Confirmation */}
                <div className="mt-2">
                  <label className="inline-flex items-start gap-3">
                    <input
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                      type="checkbox"
                      name="acknowledgement"
                      id="acknowledgement"
                      onChange={(e) => setConfirmedDisclaimer(e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">
                      I understand that side events are subject to approval and
                      applicable hosting fees. I am open to discussing available
                      packages and logistics upon acceptance of this proposal.
                    </span>
                  </label>
                </div>

                {/* Recaptcha */}
                <div className="my-4">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                    data-callback="onCaptcha"
                    data-expired-callback="onCaptchaExpired"
                  />
                </div>

                {/* Submit */}
                <div className="mt-4">
                  <button
                    id="_form_394_submit"
                    type="submit"
                    disabled={!confirmedDisclaimer && !captchaOk}
                    className={`rounded-full px-5 py-2 text-white transition ${
                      confirmedDisclaimer && captchaOk
                        ? "bg-gray-900 hover:bg-black"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Submit Application</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /Form */}
        </div>
      </div>
    </div>
  );
}
