import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/contact-email";

const SENDER_API_URL = "https://api.sender.net/v2";
const NEWSLETTER_GROUP_ID = "dw2jKz";

function extractFirstName(email: string): string {
  // Get the part before @ and remove any numbers or special characters
  const namePart = email.split("@")[0];
  // Clean up the name (remove numbers, dots, underscores, etc)
  const cleanName = namePart.replace(/[^a-zA-Z]/g, " ").trim();
  // Capitalize first letter of each word
  return cleanName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function addSubscriberToSender(email: string) {
  try {
    const firstName = extractFirstName(email);

    const response = await fetch(`${SENDER_API_URL}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDER_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: {
          first_name: firstName,
        },
        groups: [NEWSLETTER_GROUP_ID],
        trigger_automation: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message === "Subscriber already exists") {
        // If subscriber exists, try to update their groups and first name
        const updateResponse = await fetch(
          `${SENDER_API_URL}/subscribers/${email}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${process.env.SENDER_API_TOKEN}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              fields: {
                first_name: firstName,
              },
              groups: [NEWSLETTER_GROUP_ID],
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update subscriber");
        }

        return { message: "Subscriber updated successfully" };
      }
      throw new Error(data.message || "Failed to subscribe");
    }

    return data;
  } catch (error) {
    console.error("Sender API Error:", error);
    throw error;
  }
}

async function sendContactEmail(formData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Contact Form <contact@codespaces.org>",
      to: "hello@codespaces.org",
      subject: `New Contact Form Submission: ${formData.subject}`,
      react: ContactEmail({
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email,
        subject: formData.subject,
        phoneNumber: formData.phoneNumber || "",
        message: formData.message,
      }),
      text: `Contact Form Submission\n\nName: ${formData.firstName || ""} ${formData.lastName || ""}\nEmail: ${formData.email}\nPhone: ${formData.phoneNumber || "Not provided"}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
      replyTo: formData.email,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, subject, message, website_url, timestamp } = body;

    if (website_url) {
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    }

    if (subject && message) {
      const MIN_DURATION = 2000;
      const submissionTime = Number(timestamp) || 0;
      const duration = Date.now() - submissionTime;

      if (!submissionTime || duration < MIN_DURATION) {
        return NextResponse.json(
          { message: "Message sent successfully" },
          { status: 200 }
        );
      }

      await sendContactEmail(body);
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    }
    else {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      if (!process.env.SENDER_API_TOKEN) {
        console.error("Missing Sender API token");
        return NextResponse.json(
          { error: "Server configuration error" },
          { status: 500 }
        );
      }

      await addSubscriberToSender(email);

      return NextResponse.json(
        {
          message: "Successfully subscribed to newsletter",
          firstName: extractFirstName(email),
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred. Please try again.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
