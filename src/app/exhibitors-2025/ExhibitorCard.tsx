
import { slugify } from "@/modules/Helper";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExhibitorCard({ exhibitor }: any) {
  return (
    <div className="rounded-2xl p-2 shadow-md bg-gradient-2 hover:shadow-lg transition relative min-h-[400px] sm:min-h-[480px]">
      <div>
        <div className="bg-white p-5 rounded-2xl flex justify-center items-center  sm:h-[250px]">
          <Image
            width={160}
            height={160}
            src={exhibitor.company_logo}
            alt={exhibitor.company_name}
            className="h-24 mx-auto object-contain mb-4 aspect-square"
          />
        </div>

        <div className="p-5">
          <h4 className="text-white text-md font-bold uppercase leading-tight max-w-[200px] mb-3">
            {exhibitor.company_name}
          </h4>
          {exhibitor.stand_no && (
            <p className="text-md text-white mb-1">
              Stand No: {exhibitor.stand_no}
            </p>
          )}
          {exhibitor.country && (
            <p className="text-md text-white line-clamp-3">
              {exhibitor.country}
            </p>
          )}
        </div>

        <div className="p-5 absolute bottom-2 right-2">
          <Link
            href={`/exhibitors-2025/${slugify(exhibitor.company_name)}`}
            className="flex items-center gap-3 text-white"
          >
            VIEW DETAILS <ChevronRight className=""/>
          </Link>
        </div>
      </div>
    </div>
  );
}
