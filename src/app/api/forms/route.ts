import { NextResponse } from "next/server";
import payload from "payload";

export async function GET() {
  try {
    const forms = await payload.find({
      collection: "forms",
      depth: 2,
    });

    return NextResponse.json(forms.docs);
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
} 