"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import JsLoader from "@/modules/JsLoader";
import Link from "next/link";
import { businessTypes } from "@/constants/NatureOfBusiness";

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
}

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: CountryData[];
  CountriesData: CountryData[];
  type: string;
  PDFLink: string;
  pageData: Form2026;
}

export default function DownloadInterestForm({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  type,
  PDFLink,
  pageData,
}: Props) {
  const [captchaOk, setCaptchaOk] = useState(false);

  useEffect(() => {
    JsLoader.loadFile(`/assets/js/downloadAgenda.js`);
  }, []);

  useEffect(() => {
    (window as any).onCaptcha = () => setCaptchaOk(true);
    (window as any).onCaptchaExpired = () => setCaptchaOk(false);
  }, []);

  const onNewsletterClick = () => {
    const yes = document.getElementById(
      "field_231Yes"
    ) as HTMLInputElement | null;
    const no = document.getElementById(
      "field_231No"
    ) as HTMLInputElement | null;
    const cb = document.getElementById("newsletter") as HTMLInputElement | null;
    if (!yes || !no || !cb) return;
    if (cb.checked) {
      yes.checked = true;
      no.checked = false;
    } else {
      yes.checked = false;
      no.checked = true;
    }
  };

  // Tailwind utility presets
  const inputCls =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition";
  const selectCls =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition";
  const sectionCard = "rounded-2xl border border-gray-200 bg-white shadow-sm";

  return (
    <div className="">
      {/* Form Card */}
      <div className="mx-auto mt-8 max-w-6xl">
        <div className={`${sectionCard} p-6 md:p-8`}>
          <form
            method="POST"
            action="//ac.strategic.ae/proc.php"
            id="_form_394_"
            noValidate
            className="space-y-8 "
          >
            {/* Hidden CRM fields */}
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
            <input type="hidden" name="field[328]" value={mainsource} />
            <input type="hidden" name="field[329]" value={subsource} />
            <p className="sr-only" id="downloadFileLink">
              {PDFLink}
            </p>
            <input type="hidden" name="leadType" value={"AIM Lead"} />

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {type === "brochure"
                  ? "Download Brochure"
                  : type === "postshow-report"
                  ? "Download Postshow Report"
                  : "Register Interest"}
              </h2>
              <p className="text-sm text-gray-600">
                Get instant access to the official Post‑Show Report. Simply fill
                out the form to download a detailed PDF with key insights,
                statistics, and event highlights.
              </p>
            </div>
            <div className="_form-content">
              {/* Grid Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 ">
                {/* First Name */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="firstname"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lastname"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  />
                </div>
                {/* Organization */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="customer_account"
                    className="text-sm font-medium text-gray-700"
                  >
                    Organization <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="customer_account"
                    name="customer_account"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    itemID="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  />
                </div>

                {/* Job Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Job Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="field[23]"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Mobile Phone <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="phoneCode"
                      required
                      className="w-28 rounded-lg border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    >
                      <option value="">Code</option>
                      {CountriesCode.map((c, i) => (
                        <option key={i} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      name="field[12]"
                      required
                      placeholder="Phone number"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Country <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="field[3]"
                    required
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  >
                    <option value="">Select Country</option>
                    {CountriesData.map((c, i) => (
                      <option key={i} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nationality */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nationality <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="field[99]"
                    required
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  >
                    <option value="">Select Nationality</option>
                    {CountriesData.map((c, i) => (
                      <option key={i} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nature of Business */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nature of Business <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="field[4]"
                    required
                    className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  >
                    <option value="">Select</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interested as */}
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-900">
                    Interested to attend as
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Exhibitor",
                      "Sponsor",
                      "Supporting Partner",
                      "Media Partner",
                      "Investment Destination Presenter",
                      "Conference/Workshop Delegate",
                      "Visitor",
                    ].map((label, i) => (
                      <label
                        key={i}
                        className="group flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:border-primary"
                      >
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          type="checkbox"
                          name="field[228][]"
                          value={label}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div
                  className="_form-thank-you "
                  style={{ display: "none" }}
                ></div>

                {/* reCAPTCHA + Submit */}
                <div className="sm:col-span-2">
                  <div className="flex justify-start">
                    <div
                      className="g-recaptcha"
                      data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                      data-callback="onCaptcha"
                      data-expired-callback="onCaptchaExpired"
                    />
                  </div>
                  <button
                    id="_form_394_submit"
                    type="submit"
                    className="inline-flex mt-3 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
                    disabled={!captchaOk}
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
