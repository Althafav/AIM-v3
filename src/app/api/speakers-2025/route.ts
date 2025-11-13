import { NextResponse } from "next/server";

export async function GET() {
  try {
    const eventid = "04f6919c-7c2c-4397-b46c-efcfcab1539a";
    const APIUrl = `https://payment.aimcongress.com/api/SpeakersAPI/GetApprovedSpeakers?eventid=${eventid}`;
    const Res = await fetch(APIUrl, {
      next: { revalidate: 60 },
    });
    const Raw = (await Res.json()) as any[];

    const filteredData = Array.isArray(Raw)
      ? Raw.filter((s) => s.Email !== "naveed.habib@strategic.ae").slice(0, 40)
      : [];
    return NextResponse.json(filteredData);
  } catch (err) {}
}
