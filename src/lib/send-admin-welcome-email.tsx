import {
  AdminWelcomeEmail,
  getAdminWelcomeEmailText,
} from "@/emails/admin-welcome-email";
import { Resend } from "resend";

interface SendAdminWelcomeEmailArgs {
  email: string;
  name?: string | null;
  resetUrl: string;
}

export async function sendAdminWelcomeEmail({
  email,
  name,
  resetUrl,
}: SendAdminWelcomeEmailArgs) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  return resend.emails.send({
    from: "Code Space <contact@codespaces.org>",
    to: email,
    subject: "Welcome to Code Space",
    react: AdminWelcomeEmail({ name, resetUrl }),
    text: getAdminWelcomeEmailText({ name, resetUrl }),
    replyTo: "hello@codespaces.org",
  });
}
