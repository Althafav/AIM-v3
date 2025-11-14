"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

export function CustomYoutube({ embedUrl }: { embedUrl: string }) {
  const [play, setPlay] = useState(false);

  const videoId = embedUrl.split("v=")[1]?.split("&")[0];
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
      {!play && (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setPlay(true)}
        >
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />

          {/* Custom blue play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
              <FaPlay className="text-xl ml-1" />
            </div>
          </div>
        </div>
      )}

      {play && (
        <iframe
          src={`${embedUrl}?autoplay=1&mute=1`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
      )}
    </div>
  );
}
