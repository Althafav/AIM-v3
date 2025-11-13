import React from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface GradientOverlayProps {
  direction?: Direction;
  fromColor?: string;
  viaColor?: string;
  toColor?: string;
  opacity?: number;
  rounded?: boolean;
  className?: string;
}

/**
 * Works with any CSS color (hex, rgba, etc.)
 */
export default function GradientOverlayComponent({
  direction = "top",
  fromColor = "black", // 🔴 red default
  viaColor,
  toColor = "transparent",
  opacity = 1,
  rounded = true,
  className = "",
}: GradientOverlayProps) {
  const directionMap: Record<Direction, string> = {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  };

  const gradient = viaColor
    ? `linear-gradient(${directionMap[direction]}, ${fromColor}, ${viaColor}, ${toColor})`
    : `linear-gradient(${directionMap[direction]}, ${fromColor}, ${toColor})`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${
        rounded ? "rounded-3xl" : ""
      } ${className}`}
      style={{
        background: gradient,
        opacity,
      }}
    />
  );
}
