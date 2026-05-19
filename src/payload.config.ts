import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, type EmailAdapter, type SendEmailOptions } from "payload";
import { Resend } from "resend";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Blog } from "./collections/Blog";
import { Gallery } from "./collections/Gallery";
import { UpcomingEvents } from "./collections/UpcomingEvents";
import { PastEvents } from "./collections/PastEvents";
import { Press } from "./collections/Press";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const defaultFromAddress = "contact@codespaces.org";
const defaultFromName = "Code Space";

function formatAddress(address: unknown): string | undefined {
  if (!address) {
    return undefined;
  }

  if (typeof address === "string") {
    return address;
  }

  if (Array.isArray(address)) {
    return address.map(formatAddress).filter(Boolean).join(", ");
  }

  if (typeof address === "object" && "address" in address) {
    const addressValue = String(address.address);
    const name = "name" in address && address.name ? String(address.name) : "";

    return name ? `${name} <${addressValue}>` : addressValue;
  }

  return String(address);
}

function formatRecipients(address: unknown): string | string[] | undefined {
  if (!address) {
    return undefined;
  }

  if (Array.isArray(address)) {
    return address.map(formatAddress).filter(Boolean) as string[];
  }

  return formatAddress(address);
}

const resendEmailAdapter: EmailAdapter = ({ payload }) => ({
  name: "resend",
  defaultFromAddress,
  defaultFromName,
  sendEmail: async (message: SendEmailOptions) => {
    if (!process.env.RESEND_API_KEY) {
      payload.logger.error({
        msg: "Missing RESEND_API_KEY. Payload email was not sent.",
        subject: message.subject,
      });
      return null;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = formatRecipients(message.to);

    if (!to) {
      throw new Error("Payload email is missing a recipient.");
    }

    const cc = formatRecipients(message.cc);
    const bcc = formatRecipients(message.bcc);
    const replyTo = formatRecipients(message.replyTo);

    return resend.emails.send({
      from:
        formatAddress(message.from) ||
        `${defaultFromName} <${defaultFromAddress}>`,
      to,
      subject: String(message.subject || ""),
      text: message.text ? String(message.text) : "",
      ...(message.html ? { html: String(message.html) } : {}),
      ...(cc ? { cc } : {}),
      ...(bcc ? { bcc } : {}),
      ...(replyTo ? { replyTo } : {}),
    });
  },
});

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          label: 'Mobile',
          width: 375,
          height: 667,
        },
        {
          name: 'tablet',
          label: 'Tablet',
          width: 768,
          height: 1024,
        },
        {
          name: 'desktop',
          label: 'Desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Blog, Gallery, UpcomingEvents, PastEvents, Press],
  email: resendEmailAdapter,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
