// app/api/search-index/route.ts
import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/modules/searchIndex";

export const revalidate = 3600;

export async function GET() {
  try {
    const index = await buildSearchIndex();
    return NextResponse.json(index, { status: 200 });
  } catch (error) {
    console.error("Search index error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
