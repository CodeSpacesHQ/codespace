import { NextRequest, NextResponse } from "next/server";
import payload from "payload";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await payload.findByID({
      collection: "events",
      id: params.id,
      depth: 2,
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
} 