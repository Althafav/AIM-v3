import React, { useEffect, useCallback, useState } from "react";

import { FaClock, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const formatTime = (timeString: string) => {
  if (!timeString) return "";
  const [h, m] = timeString.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hr = hour % 12 || 12;
  return `${hr}:${m} ${suffix}`;
};

interface Props {
  speaker: any | null;
  onClose: () => void;
  isOpen: boolean;
}

const SpeakerPopupModal: React.FC<Props> = ({ speaker, onClose, isOpen }) => {
  const [sessionData, setSessionData] = useState<any[]>([]);
  const has = (v?: string) => typeof v === "string" && v.trim().length > 1;

  // Close on ESC — add/remove only when open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("overflow-hidden");
    const originalPaddingRight = document.body.style.paddingRight;
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Load sessions only when open and when the speaker changes
  useEffect(() => {
    if (!isOpen || !speaker) return;
    let mounted = true;

    const loadSessions = async () => {
      if (speaker?.Sessions && speaker.Sessions.length > 0) {
        const sessionPromises = speaker.Sessions.map(async (sessionId: any) => {
          const sessionApi = `https://speakers.aimcongress.com/api/website/Session?SessionId=${sessionId}`;
          try {
            const res = await fetch(sessionApi);
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        });

        const sessions = await Promise.all(sessionPromises);
        const filtered = sessions.filter(Boolean) as any[];
        if (mounted) setSessionData(filtered);
      } else {
        if (mounted) setSessionData([]);
      }
    };

    loadSessions();
    return () => {
      mounted = false;
    };
  }, [isOpen, speaker]);

  // ⬇️ Now it’s safe to early-return
  if (!isOpen || !speaker) return null;

  // Backdrop click handler (only if user clicks outside dialog)
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-popup-title"
      onClick={onBackdropClick}
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl outline-none max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-end p-3 bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/60">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
          >
            <span className="sr-only">Close</span>
            {/* x icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 pt-0 md:p-6 md:pt-0">
          {/* Image + basic info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="">
              <div className="grid grid-cols-12 items-start gap-3 md:gap-4">
                <div className="col-span-4">
                  {speaker.Image?.endsWith(".pdf") ? (
                    <div className="w-full aspect-3/4 rounded border bg-gray-100" />
                  ) : (
                    <img
                      src={speaker.Image || "/default-avatar.jpg"}
                      alt={`${speaker.Name}`}
                      className="w-full aspect-3/4 rounded border object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = "/default-avatar.jpg";
                      }}
                    />
                  )}
                </div>

                <div className="col-span-8">
                  <h2
                    id="speaker-popup-title"
                    className="text-xl font-semibold text-gray-900 mb-1"
                  >
                    {speaker.FirstName} {speaker.LastName}
                  </h2>

                  {speaker.Designation && (
                    <p className="text-gray-800 mb-0">{speaker.Designation}</p>
                  )}
                  {speaker.Company && (
                    <p className="text-gray-500 mb-0">{speaker.Company}</p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {speaker.Linkedin &&
                      /^https?:\/\/(www\.)?linkedin\.com/i.test(
                        speaker.Linkedin
                      ) && (
                        <Link
                          href={speaker.Linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full p-2 text-white"
                          style={{ backgroundColor: "#1B3966" }}
                        >
                          <FaLinkedin size={22} />
                        </Link>
                      )}

                    {speaker.Instagram &&
                      /^https?:\/\/(www\.)?instagram\.com/i.test(
                        speaker.Instagram
                      ) && (
                        <Link
                          href={speaker.Instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full p-2 text-white"
                          style={{ backgroundColor: "#1B3966" }}
                        >
                          <FaInstagram size={22} />
                        </Link>
                      )}

                    {speaker.Facebook &&
                      /^https?:\/\/(www\.)?facebook\.com/i.test(
                        speaker.Facebook
                      ) && (
                        <Link
                          href={speaker.Facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full p-2 text-white"
                          style={{ backgroundColor: "#1B3966" }}
                        >
                          <FaFacebook size={22} />
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              {speaker.Profile && (
                <div className="text-sm text-gray-800 whitespace-pre-wrap wrap-break-word">
                  {speaker.Profile}
                </div>
              )}
            </div>
            {sessionData.length > 0 && (
              <div>
                <div className="rounded-t-lg bg-[#1B3966]">
                  <h4 className="text-white p-3 m-0 text-lg font-semibold">
                    Sessions
                  </h4>
                </div>

                <div>
                  <div className="grid grid-cols-1 gap-3">
                    {sessionData.map((item, index) => (
                      <div key={index} className="rounded border bg-white">
                        <div className="p-4">
                          <div className="mb-3 flex flex-wrap items-center gap-4 text-gray-700">
                            <div className="flex items-center gap-2">
                              <FaClock />
                              <span>{formatTime(item.StartTime)}</span>
                            </div>
                          </div>

                          <h4 className="mb-4 text-lg font-semibold text-gray-900">
                            {item.SessionName}
                          </h4>

                          <div
                            className="prose prose-sm max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: item.Description || "",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer placeholder if needed */}
      </div>
    </div>
  );
};

export default SpeakerPopupModal;
