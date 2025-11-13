"use client";
import { gsap } from "gsap";
import { useRef, useMemo, JSX } from "react";
import { useGSAP } from "@gsap/react";


type SplitTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function SplitText({
  text,
  as: Tag = "h1",
  className,
}: SplitTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  const words = useMemo(() => text.split(/(\s+)/), [text]);

  useGSAP(() => {
    if (!rootRef.current) return;
    const targets = rootRef.current.querySelectorAll(".word");

    gsap.fromTo(
      targets,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%", // adjust as needed
          toggleActions: "play none none reverse", // play when in view
        },
      }
    );
  }, [text]);

  return (
    <div ref={rootRef as any} className={className}>
      {words.map((w, i) => (
        <span key={i} className="word inline-block">
          {w === " " ? "\u00A0" : w}
        </span>
      ))}
    </div>
  );
}

// Usage example:
// <SplitText text={bannerheading} as="h1" className="text-white text-7xl max-w-3xl font-bold mb-4" />
