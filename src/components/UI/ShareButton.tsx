"use client";

import { IoShareSocial } from "react-icons/io5";

export default function ShareButton() {
  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Check out these articles!",
          url: window.location.href,
        });
      } else {
        // fallback: copy URL
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 ring-1 ring-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
      aria-label="Share"
      title="Share"
    >
      <IoShareSocial color="white" size={20} />
    </button>
  );
}
