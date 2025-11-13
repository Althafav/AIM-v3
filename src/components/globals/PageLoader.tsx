"use client";

import React, { useEffect, useState } from "react";

export default function PageLoader() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("overflow-hidden");

    const MIN = 700; // minimum time to show loader (ms)
    const FADE = 300; // fade-out duration (ms)
    const MAX = 4000; // safety timeout (ms)
    const started = performance.now();

    const finish = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN - elapsed);
      window.setTimeout(() => {
        setFade(true);
        window.setTimeout(() => {
          setShow(false);
          root.classList.remove("overflow-hidden");
        }, FADE);
      }, wait);
    };

    // End when the page is fully loaded, or after MAX as a fallback
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const maxTimer = window.setTimeout(finish, MAX);

    return () => {
      window.clearTimeout(maxTimer);
      window.removeEventListener("load", finish);
      root.classList.remove("overflow-hidden");
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-label="Page loading"
      className={`fixed inset-0 z-9999 bg-white flex items-center justify-center transition-opacity duration-300 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src="/assets/logos/aimlogolandscape.png"
          alt="ECEA"
          className=" w-[250px] object-contain select-none animate-pulse motion-reduce:animate-none"
          draggable={false}
        />

        {/* Indeterminate bar */}
        <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-slate-200">
          <div className="loader-bar h-full w-1/3 bg-slate-800 motion-reduce:hidden" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loaderSlide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(50%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .loader-bar {
          animation: loaderSlide 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
