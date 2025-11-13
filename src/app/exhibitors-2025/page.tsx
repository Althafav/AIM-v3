"use client";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import Section from "@/components/UI/Section";
import React, { useEffect, useMemo, useState } from "react";
import ExhibitorCard from "./ExhibitorCard";
import PageLoader from "@/components/globals/PageLoader";

export default function page() {
  const [exhibitors, setExhibitors] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await fetch("/api/exhibitors-2025");
        const data = await res.json();
        setExhibitors(data);
      } catch (error) {
        console.error("Error fetching exhibitors:", error);
      }
    };
    fetchExhibitors();
  }, []);

  const countries = useMemo(() => {
    const unique = new Set(exhibitors.map((e) => e.country).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [exhibitors]);

  const filteredExhibitors = useMemo(() => {
    return exhibitors.filter((e) => {
      const matchesCountry =
        selectedCountry === "All" || e.country === selectedCountry;

      const matchesSearch =
        searchTerm.trim() === "" ||
        e.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.stand_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.country?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCountry && matchesSearch;
    });
  }, [selectedCountry, searchTerm, exhibitors]);

  if (!exhibitors) {
    return <PageLoader />;
  }

  return (
    <div className="page">
      <HeadBanner heading="Exhibitors 2025" />
      <Section>
        <div className="container mx-auto">
          <div className="mb-6">
            <div className="flex flex-wrap justify-between gap-5">
              <input
                type="text"
                placeholder="Search exhibitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 p-2 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <label className="text-gray-800 font-semibold mr-3">
                  Filter by Country:
                </label>
                <select
                  className="p-2 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 🔹 Exhibitors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExhibitors.map((exhibitor, index) => (
              <div key={index}>
                <ExhibitorCard exhibitor={exhibitor} />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
