"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import HeadBanner from "@/components/UI/Banner/HeadBanner";
import SpeakerPopupModal from "./SpeakerPopupModal";

function normalize(s?: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typedTerm, setTypedTerm] = useState(""); // for debounce

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      const res = await fetch("/api/speakers-2025");
      const data = await res.json();
      setSpeakers(data);
    };
    fetchSpeakers();
  }, []);

  // Debounce search (200ms)
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(typedTerm), 200);
    return () => clearTimeout(id);
  }, [typedTerm]);

  const filtered = useMemo(() => {
    const q = normalize(searchTerm).trim();
    if (!q) return speakers;

    // support multi-word matching: all words must appear somewhere
    const parts = q.split(/\s+/);

    const matches = (spk: any) => {
      const blob = normalize(
        [spk.FirstName, spk.LastName, spk.Designation, spk.Company, spk.Country]
          .filter(Boolean)
          .join(" ")
      );
      return parts.every((p) => blob.includes(p));
    };

    return speakers.filter(matches);
  }, [speakers, searchTerm]);

  const filteredHigh = filtered.filter((s) => s.HighLevel);
  const filteredRegular = filtered.filter((s) => !s.HighLevel);

  if (!speakers) return null;

  const openPopup = (speaker: any) => {
    setSelectedSpeaker(speaker);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedSpeaker(null);
    setIsPopupOpen(false);
  };

  return (
    <>
      <HeadBanner heading="Speakers" />
      <div className=" speakers-page-wrapper-2025v2 bg-gradient-2">
        <div className="speaker-cards-section speaker-component-wrapper-2026 pt-5 pb-5">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full lg:max-w-5xl">
                {/* Search bar (global) */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-3 mb-4">
                  <h2 className="m-0 text-2xl font-semibold text-white">
                    High Level Speakers
                  </h2>
                  <div className="w-full lg:w-1/3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="form-control rounded-3xl w-full border text-gray-800 bg-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search"
                        value={typedTerm}
                        onChange={(e) => setTypedTerm(e.target.value)}
                      />
                      {typedTerm && (
                        <button
                          type="button"
                          className="text-white bg-transparent px-3 py-2 rounded-xl border border-white/30 hover:bg-white/10"
                          onClick={() => {
                            setTypedTerm("");
                            setSearchTerm("");
                          }}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results */}
                {filtered.length === 0 ? (
                  <p className="mt-3 text-white">
                    No speakers found for <strong>{searchTerm}</strong>.
                  </p>
                ) : (
                  <>
                    {/* High Level Speakers */}
                    {filteredHigh.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filteredHigh.map((item) => (
                          <div
                            className="cursor-pointer"
                            key={item.ItemID}
                            onClick={() => openPopup(item)}
                          >
                            <div className="text-white">
                              <div className="card-speaker-item  h-full rounded-lg overflow-hidden">
                                <div
                                  className="speaker-image-wrapper"
                                  style={{ height: "320px" }}
                                >
                                  <img
                                    width={290}
                                    height={300}
                                    src={item.Image}
                                    alt={item.FirstName}
                                    className="speaker-image-2025 w-full h-full object-cover object-center"
                                  />
                                </div>
                              </div>
                              <div className="py-2">
                                <p className="font-bold">
                                  {item.FirstName} {item.LastName}
                                </p>
                                <p
                                  className="designation text-sm mb-2"
                                  style={{ fontSize: 14 }}
                                >
                                  {item.Designation}
                                </p>
                                <p
                                  className="text-white"
                                  style={{ fontSize: 14 }}
                                >
                                  {item.Company}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Regular Speakers */}
                    {filteredRegular.length > 0 && (
                      <>
                        {filteredHigh.length > 0 && (
                          <h3 className="mt-8 mb-3 text-xl font-semibold text-white">
                            Speakers
                          </h3>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {filteredRegular.map((item) => (
                            <div
                              className="cursor-pointer"
                              key={item.ItemID}
                              onClick={() => openPopup(item)}
                            >
                              <div className="text-white">
                                <div className="card-speaker-item  h-full rounded-lg overflow-hidden">
                                  <div
                                    className="speaker-image-wrapper"
                                    style={{ height: "320px" }}
                                  >
                                    <img
                                      width={290}
                                      height={300}
                                      src={item.Image}
                                      alt={item.FirstName}
                                      className="speaker-image-2025 w-full h-full object-cover object-center"
                                    />
                                  </div>
                                </div>
                                <div className="py-2">
                                  <p className="font-bold">
                                    {item.FirstName} {item.LastName}
                                  </p>
                                  <p
                                    className="designation text-sm mb-2"
                                    style={{ fontSize: 14 }}
                                  >
                                    {item.Designation}
                                  </p>
                                  <p
                                    className="text-white"
                                    style={{ fontSize: 14 }}
                                  >
                                    {item.Company}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <SpeakerPopupModal
          speaker={selectedSpeaker}
          onClose={closePopup}
          isOpen={isPopupOpen}
        />
      </div>
    </>
  );
}
