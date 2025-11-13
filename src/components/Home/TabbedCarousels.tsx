"use client";
import React, { useState } from "react";
import { FaUserTie, FaStoreAlt, FaHandshake } from "react-icons/fa";
import Section from "../UI/Section";
import SpeakersCarousel from "./SpeakersCarousel";
import ExhibitorsCarousel from "./ExhibitorsCarousel";
import PartnersCarousel from "./PartnersCarousel";

export default function TabbedCarousels() {
  const [activeTab, setActiveTab] = useState<
    "speakers" | "exhibitors" | "partners"
  >("speakers");

  const tabs = [
    { id: "speakers", label: "Speakers", icon: <FaUserTie /> },
    { id: "exhibitors", label: "Exhibitors", icon: <FaStoreAlt /> },
    { id: "partners", label: "Partners", icon: <FaHandshake /> },
  ] as const;

  return (
    <Section className="">
      {/* Tab Buttons */}
      <div className="container mx-auto">
        <div className="flex justify-start gap-3 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all
              ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "speakers" && (
          <SpeakersCarousel
            heading="Speakers 2025"
            ctaname="View all speakers"
            ctalink="/speakers-2025"
          />
        )}
        {activeTab === "exhibitors" && (
          <ExhibitorsCarousel
            heading="Exhibitors 2025"
            ctaname="View all exhibitors"
            ctalink="/exhibitors-2025"
          />
        )}
        {activeTab === "partners" && (
          <PartnersCarousel
            heading="Partners 2025"
            ctaname="View all Partners"
            ctalink="/partners-2025"
          />
        )}
      </div>
    </Section>
  );
}
