import { NextResponse } from "next/server";
import payload from "payload";

export async function GET() {
  try {
    const events = await payload.find({
      collection: "events",
      depth: 2,
    });

    return NextResponse.json(events.docs);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
} 