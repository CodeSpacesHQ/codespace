import { NextRequest, NextResponse } from "next/server";
import payload from "payload";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.json();
    const event = await payload.findByID({
      collection: "events",
      id: params.id,
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Update the event document with the new registration
    await payload.update({
      collection: "events",
      id: params.id,
      data: {
        registrations: [
          ...(event.registrations || []),
          {
            submittedAt: new Date().toISOString(),
            formData,
          },
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
} 