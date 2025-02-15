import { NextRequest, NextResponse } from "next/server";
import payload from "payload";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.json();
    const form = await payload.findByID({
      collection: "forms",
      id: params.id,
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    // Update the form document with the new registration
    await payload.update({
      collection: "forms",
      id: params.id,
      data: {
        registrations: [
          ...(form.registrations || []),
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