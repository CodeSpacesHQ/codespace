import { CollectionConfig } from "payload";

export const Forms: CollectionConfig = {
  slug: "forms",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "title",
      label: "Event Title",
      type: "text",
      required: true,
    },
    {
      name: "date",
      label: "Event Date",
      type: "date",
      required: true,
    },
    {
      name: "time",
      label: "Event Time (ET)",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Event Description",
      type: "richText",
      required: true,
    },
    {
      name: "featuredImage",
      label: "Featured Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "speakers",
      label: "Speakers",
      type: "array",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "title",
          label: "Job Title",
          type: "text",
          required: true,
        },
        {
          name: "image",
          label: "Speaker Image",
          type: "upload",
          relationTo: "media",
          required: true,
        }
      ]
    },
    {
      name: "registrationFields",
      label: "Registration Form Fields",
      type: "array",
      fields: [
        {
          name: "fieldName",
          label: "Field Name",
          type: "text",
          required: true,
        },
        {
          name: "fieldType",
          label: "Field Type",
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "URL", value: "url" },
          ],
          required: true,
        },
        {
          name: "required",
          label: "Required",
          type: "checkbox",
        },
        {
          name: "placeholder",
          label: "Placeholder Text",
          type: "text",
        }
      ]
    },
    {
      name: "registrations",
      label: "Registrations",
      type: "array",
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "submittedAt",
          type: "date",
        },
        {
          name: "formData",
          type: "json",
        }
      ]
    }
  ]
}; 