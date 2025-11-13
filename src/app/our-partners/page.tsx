// src/app/partners-2025/page.tsx

import { deliveryClient } from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PartnersClient from "./PartnersClient";
import Section from "@/components/UI/Section";
import HeadBanner from "@/components/UI/Banner/HeadBanner";

export const revalidate = 60;

export const metadata = {
  title: "AIM Congress Partners 2025",
  description:
    "Discover our 2025 Partners at AIM Congress, the World's Leading Investment Platform.",
};

const CATEGORIES = [
  "Supporting Partner",
  "Conference Participants",
  "Knowledge Partner",
  "Event Partner",
  "Investment Community Partner",
  "Strategic Partner",
  "Community Partner",
] as const;

type PartnerItem = {
  id: string;
  name: string;
  imageUrl: string | null;
  categories: string[];
};

type Categorized = Record<string, PartnerItem[]>;

async function fetchAll(): Promise<Categorized> {
  const [
    fdiResponse,
    conferenceResponse,
    gtResponse,
    gmResponse,
    fcResponse,
    deResponse,
    ffResponse,
    smeResponse,
  ]: any = await Promise.all([
    deliveryClient.item("fdi_portfolio").toPromise(),
    deliveryClient.item("conference_participants_partners_2025").toPromise(),
    deliveryClient.item("global_trade_portfolio").toPromise(),
    deliveryClient.item("advanced_manufacturing_portfolio").toPromise(),
    deliveryClient.item("future_cities_porfolio").toPromise(),
    deliveryClient.item("digital_economy_portfolio").toPromise(),
    deliveryClient.item("future_finance_portfolio").toPromise(),
    deliveryClient.item("entrepreneur_portfolio").toPromise(),
  ]);

  const allRaw = [
    ...(conferenceResponse?.data.item?.elements?.items?.linkedItems ?? []),
    ...(fdiResponse?.data.item?.elements?.currentparntersitems?.linkedItems ??
      []),
    ...(gtResponse?.data.item?.elements?.currentparntersitems?.linkedItems ??
      []),
    ...(gmResponse?.data.item?.elements?.currentparntersitems?.linkedItems ??
      []),
    ...(fcResponse?.data.item?.elements?.currentparntersitems?.linkedItems ??
      []),
    ...(deResponse?.data.item?.elements?.currentparntersitems?.linkedItems ??
      []),
    ...(ffResponse?.data.item?.elements?.keyplayersitems?.linkedItems ?? []),
    ...(smeResponse?.data.item?.elements?.keyplayersitems?.linkedItems ?? []),
  ] as any[];

  const items: PartnerItem[] = allRaw.map((it) => ({
    id: it?.system?.id,
    name: it?.elements?.name?.value ?? "",
    imageUrl: it?.elements?.image?.value?.[0]?.url ?? null,
    content: it?.elements?.content.value ?? "",
    website: it?.elements?.link.value ?? "",
    categories:
      (it?.elements?.category?.value ?? [])
        .map((c: any) => c?.name)
        .filter(Boolean) || [],
  }));

  const categorized: Categorized = {};
  for (const cat of CATEGORIES) categorized[cat] = [];

  for (const it of items) {
    for (const c of it.categories) {
      if (!categorized[c]) categorized[c] = [];
      categorized[c].push(it);
    }
  }

  return categorized;
}

export default async function Page() {
  const categorized = await fetchAll();

  return (
    <div>
      <HeadBanner heading="AIM Congress Partners 2025" />
      <div className="bg-white py-5">
        <div className="container mx-auto">
          <PartnersClient categorized={categorized} categories={CATEGORIES} />
        </div>
      </div>
    </div>
  );
}
