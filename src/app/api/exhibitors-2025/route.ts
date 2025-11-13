import { NextResponse } from "next/server";

export async function GET() {
  try {
    const eventid = "d4f936d0-0668-405d-9522-e035efbd4c9c";
    const APIUrl = `https://api.aimcongress.com/api/website/getexhibitors?eventid=${eventid}`;
    const Res = await fetch(APIUrl, {
      next: { revalidate: 60 },
    });
    const Raw = (await Res.json()) as any[];

    const filteredData = Array.isArray(Raw)
      ? Raw.filter((s) => s.company_email !== "naveed.habib@strategic.ae").slice(0, 40)
      : [];
    return NextResponse.json(filteredData);
  } catch (err) {}
}
