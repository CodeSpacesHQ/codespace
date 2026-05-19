import { sendAdminWelcomeEmail } from "@/lib/send-admin-welcome-email";
import { checkIsCodespaceUser } from "@/lib/utils";
import type { CollectionAfterChangeHook, CollectionConfig } from "payload";

const sendWelcomeEmailAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== "create" || !doc.email) {
    return doc;
  }

  try {
    const token = await req.payload.forgotPassword({
      collection: "users",
      data: {
        email: doc.email,
      },
      disableEmail: true,
      req,
    });

    if (!token) {
      req.payload.logger.warn({
        msg: "Could not generate welcome reset token for new admin user.",
        userID: doc.id,
      });
      return doc;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org";
    const resetUrl = `${baseUrl.replace(/\/$/, "")}/admin/reset/${token}`;

    await sendAdminWelcomeEmail({
      email: doc.email,
      name: typeof doc.name === "string" ? doc.name : null,
      resetUrl,
    });
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: "Failed to send welcome email for new admin user.",
      userID: doc.id,
    });
  }

  return doc;
};

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
    hidden(args) {
      return !checkIsCodespaceUser(args.user);
    },
  },
  auth: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkIsCodespaceUser(user),
    update: ({ req: { user } }) => {
      if (checkIsCodespaceUser(user)) {
        return true;
      }
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req: { user } }) => checkIsCodespaceUser(user),
  },
  hooks: {
    afterChange: [sendWelcomeEmailAfterCreate],
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "profilePicture",
      label: "Profile Picture",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload a profile picture (recommended size: 400x400 pixels)",
      },
    },
  ],
};
