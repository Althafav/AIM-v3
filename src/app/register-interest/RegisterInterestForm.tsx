"use client";

import { useEffect, useCallback, useState } from "react";
import { businessTypes } from "@/constants/NatureOfBusiness";
import JsLoader from "@/modules/JsLoader";

type Country = { label: string; value: string };

export default function RegisterInterestForm({
  pageData,
  CountriesData,
  CountriesCode,
  attendAs,
  mainsource,
  subsource,
}: {
  pageData: any;
  CountriesData: Country[];
  CountriesCode: Country[];
  attendAs: string;
  mainsource: string;
  subsource: string;
}) {
  const [captchaOk, setCaptchaOk] = useState(false);
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/registerInterest.js`);
  }, []);

  useEffect(() => {
    (window as any).onCaptcha = () => setCaptchaOk(true);
    (window as any).onCaptchaExpired = () => setCaptchaOk(false);
  }, []);

  const handleCheck = useCallback(
    (checkboxId: string, yesFieldId: string, noFieldId: string) => {
      const checkbox = document.getElementById(
        checkboxId
      ) as HTMLInputElement | null;
      const yesInput = document.getElementById(
        yesFieldId
      ) as HTMLInputElement | null;
      const noInput = document.getElementById(
        noFieldId
      ) as HTMLInputElement | null;

      if (!checkbox || !yesInput || !noInput) {
        console.warn("Missing checkbox or hidden input fields.");
        return;
      }

      const checked = !!checkbox.checked;
      yesInput.checked = checked;
      noInput.checked = !checked;
    },
    []
  );

  useEffect(() => {
    if (!attendAs) return;
    const target = attendAs.toLowerCase();
    const ids = [
      "field_228_Speaker",
      "field_228_Sponsor",
      "field_228_Supporting Partner",
      "field_228_Media Partner",
      "field_228_Conference/Workshop Delegate",
    ];

    ids.forEach((id) => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (!el) return;
      const val = (el.value || "").toLowerCase();
      el.checked =
        val === target || (target === "delegate" && val.includes("delegate"));
    });
  }, [attendAs]);

  return (
    <div className="row py-lg-5 py-3 px-lg-3">
      <div className="col-12">
        <div className="row">
          <div className="col-12">
            <form
              method="POST"
              action="https://strategic31677.activehosted.com/proc.php"
              id="_form_514_"
              noValidate
              className="grid gap-6"
            >
              {/* Hidden fields remain unchanged */}
              <input type="hidden" name="u" value="514" />
              <input type="hidden" name="f" value="514" />
              <input type="hidden" name="act" value="sub" />
              <input type="hidden" name="v" value="2" />
              <input
                type="hidden"
                name="field[38]"
                value="AIM 2026-Register Your Interest"
              />
              <input type="hidden" name="field[328]" value={mainsource} />
              <input type="hidden" name="field[329]" value={subsource} />
              <input
                type="hidden"
                name="leadType"
                value={
                  attendAs === "Speaker" ? "Conference Leads" : "AIM Lead"
                }
              />

              {/* Fields Grid */}
              <div className="grid gap-5 md:grid-cols-2 _form-content ">
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
                <div className="flex flex-col gap-1 md:col-span-2">
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

                {/* Interested to Attend As */}
                {!attendAs && (
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <p className="text-sm font-medium text-gray-700">
                      Interested to attend as{" "}
                      <span className="text-red-600">*</span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Exhibitor",
                        "Sponsor",
                        "Supporting Partner",
                        "Media Partner",
                        "Investment Destination Presenter",
                        "Conference/Workshop Delegate",
                        "Visitor",
                      ].map((label) => (
                        <label
                          key={label}
                          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 hover:border-blue-500 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="field[228][]"
                            value={label}
                            defaultChecked={
                              attendAs?.toLowerCase() === label.toLowerCase()
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="_form-thank-you "
                  style={{ display: "none" }}
                ></div>
              </div>

              {/* reCAPTCHA + Submit */}
              <div className="flex items-start gap-4 flex-col">
                <div
                  className="g-recaptcha"
                  data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                  data-callback="onCaptcha"
                  data-expired-callback="onCaptchaExpired"
                />
                <button
                  disabled={!captchaOk}
                  id="_form_514_submit"
                  type="submit"
                  className="disabled:opacity-50 rounded-full aimbtn aimbtn--primary bg-primary text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
