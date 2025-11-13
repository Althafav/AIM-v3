import { deliveryClient } from "@/modules/Globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await deliveryClient
      .item("n2025_sponsors_page")
      .depthParameter(4)
      .toPromise();

    const pageData = res.data.item.elements as any;

    return NextResponse.json(pageData.sponsors.linkedItems);
  } catch (err) {
    console.error("Kontent fetch failed", err);
    return NextResponse.json(
      { error: "Failed to load global content" },
      { status: 500 }
    );
  }
}
