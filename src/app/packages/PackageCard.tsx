// components/packages/PackageCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function PackageCard({
  item,
  invitee,
  source,
}: {
  item: any;
  invitee: string;
  source: string;
}) {
  // Handle both shapes (linkedItems vs value)
  const pillars: any[] =
    item?.elements.items?.linkedItems ?? item?.elements.items?.value ?? [];

  const [selectedPillarId, setSelectedPillarId] = React.useState<string | null>(
    pillars.length ? pillars[0]?.system?.id ?? null : null
  );

  const selectedPillar =
    pillars.find((p: any) => p?.system?.id === selectedPillarId) ?? null;

  // Kontent fields sometimes live under `elements`
  const getVal = (obj: any, key: string) =>
    obj?.elements?.[key]?.value ?? obj?.[key]?.value ?? "";

  const packageColor = getVal(item, "colorcode");

  const pillarColor = selectedPillar
    ? getVal(selectedPillar, "colorcode")
    : packageColor;

  const featuresStr =
    (selectedPillar ? getVal(selectedPillar, "features") : "") ||
    getVal(item, "features") ||
    "";

  const features: string[] = featuresStr
    .split("|")
    .map((f: string) => f.trim())
    .filter(Boolean);

  const linkBase =
    (selectedPillar ? getVal(selectedPillar, "ctalink") : "") ||
    getVal(item, "ctalink") ||
    "#";

  const finalSource =
    invitee && !source ? "invitee" : !source ? "website" : source;

  const registerHref = `${linkBase}${
    linkBase.includes("?") ? "&" : "?"
  }source=${encodeURIComponent(finalSource)}${
    invitee ? `&invitee=${encodeURIComponent(invitee)}` : ""
  }`;

  return (
    <div
      className="group relative rounded-2xl border border-neutral-200 bg-white/90 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{ boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)" }}
    >
      {/* Head / Pattern */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src="/assets/imgs/aim-pattern-right.svg"
          alt=""
          className="h-32 w-full object-cover"
        />
        {/* Gradient veil for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-white/85 via-white/60 to-transparent" />
        {/* Title stack */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {/* Price badge */}
                <span className="inline-flex  text-3xl font-bold tracking-tight ">
                  {item.elements.price.value}
                </span>
                {/* Name chip */}
                <span className="block text-[15px] font-medium text-neutral-900">
                  {item.elements.name.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar selector */}
      {item.elements.items.linkedItems.length > 0 && (
        <div className="px-5 pt-4">
          <label
            htmlFor={`pillar-${item?.system?.id}`}
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Select your preferred Pillar
          </label>
          <div
            className="rounded-lg border bg-white px-3 py-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] focus-within:ring-2"
            style={{
              borderColor: pillarColor || undefined,
              boxShadow: pillarColor
                ? `inset 0 0 0 1px ${pillarColor}22`
                : undefined,
            }}
          >
            <select
              id={`pillar-${item?.system?.id}`}
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: pillarColor || undefined }}
              value={selectedPillarId ?? ""}
              onChange={(e) => setSelectedPillarId(e.target.value)}
            >
              {item.elements.items.linkedItems.map((pillar: any) => {
                const label =
                  pillar?.elements?.name?.value ??
                  pillar?.name?.value ??
                  "Untitled pillar";
                return (
                  <option key={pillar?.system?.id} value={pillar?.system?.id}>
                    {pillar?.elements?.name?.value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="px-5 pt-4">
        {features.length > 0 ? (
          <ul className="divide-y divide-neutral-200/70 rounded-xl border border-neutral-200/70 bg-white/60">
            {features.map((feature, idx) => (
              <li
                key={`${item?.system?.id}-f-${idx}`}
                className="flex items-start gap-3 px-4 py-2.5"
              >
                <span className="mt-0.5">
                  <FaCheckCircle
                    size={18}
                    style={{ color: pillarColor || "#16a34a" }}
                  />
                </span>
                <p className="text-sm leading-5 text-neutral-800">{feature}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
            No features listed for this selection.
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-4">
        <Link
          href={registerHref}
          target="_blank"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2"
          style={{ background: pillarColor || "#111827" }}
        >
          Register Now
          {/* tiny animated caret on hover */}
          <svg
            className="size-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7 5l5 5-5 5" />
          </svg>
        </Link>

        {/* subtle bottom accent ring in pillar color */}
        <div
          className="mt-3 h-0.5 w-full rounded-full"
          style={{ background: (pillarColor || "#111827") + "22" }}
        />
      </div>

      {/* Outer focus/hover accent using pillar color */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-all group-hover:ring-2"
        style={{
          boxShadow: pillarColor
            ? `0 0 0 2px ${pillarColor}22 inset`
            : undefined,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
