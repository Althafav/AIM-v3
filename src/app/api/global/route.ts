import { deliveryClient } from "@/modules/Globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await deliveryClient
      .item("global_2026")
      .depthParameter(4)
      .toPromise();
      
    return NextResponse.json(res.data.item.elements);
  } catch (err) {
    console.error("Kontent fetch failed", err);
    return NextResponse.json(
      { error: "Failed to load global content" },
      { status: 500 }
    );
  }
}
