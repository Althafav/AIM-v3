import React, { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <div className={`py-12 sm:py-16 ${className}`}>
      {children}
    </div>
  );
}
