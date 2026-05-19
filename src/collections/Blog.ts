import { checkIsCodespaceUser } from "@/lib/utils";
import { CollectionConfig } from "payload";
import { sendBlogBroadcast } from "@/lib/send-blog-broadcast";

const retryOperation = async (operation: () => Promise<any>, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      if (i === maxRetries - 1) throw error;
      if (error.code === 112 || error.code === 251) {
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

export const Blog: CollectionConfig = {
  slug: "blog",
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (req.user) {
          if (operation === "create") {
            data.author = req.user.id;
            data.updatedBy = req.user.id;
          } else if (operation === "update") {
            data.updatedBy = req.user.id;
          }

          try {
            if (data.postType === 'top') {
              await retryOperation(async () => {
                await req.payload.update({
                  collection: 'blog',
                  where: {
                    and: [
                      {
                        postType: {
                          equals: 'top'
                        }
                      },
                      {
                        id: {
                          not_equals: data.id
                        }
                      }
                    ]
                  },
                  data: {
                    postType: 'regular'
                  }
                });
              });
            }

            if (data.isFeatured) {
              await retryOperation(async () => {
                await req.payload.update({
                  collection: 'blog',
                  where: {
                    and: [
                      {
                        isFeatured: {
                          equals: true
                        }
                      },
                      {
                        id: {
                          not_equals: data.id
                        }
                      }
                    ]
                  },
                  data: {
                    isFeatured: false
                  }
                });
              });
            }
          } catch (error) {
            console.error('Error in beforeChange hook:', error);
          }

          return data;
        }
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        try {
          const isNowPublished = doc?._status === "published";
          const wasPublishedBefore = previousDoc?._status === "published";
          if (!isNowPublished || wasPublishedBefore) {
            return;
          }

          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org";
          const blogUrl = `${baseUrl}/blog/${doc.id}`;

          let authorName = "Code Space";
          try {
            if (doc?.author && typeof doc.author === "object" && "name" in doc.author) {
              authorName = (doc.author as any).name || authorName;
            } else if (typeof doc?.author === "string" && doc.author) {
              const author = await req.payload.findByID({ collection: "users", id: doc.author });
              authorName = (author as any)?.name || authorName;
            }
          } catch {}

          const subject = `${doc.title}`;
          const { renderToStaticMarkup } = await import("react-dom/server");
          const { BlogNotificationEmail } = await import("@/emails/blog-notification-email");
          const html = renderToStaticMarkup(
            BlogNotificationEmail({
              title: doc.title,
              excerpt: doc.excerpt,
              authorName,
              blogUrl,
              publishedAt: new Date(doc.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              imageUrl: (doc as any)?.featuredImage?.url,
            })
          );
          const text = `New blog post: ${doc.title}\n\n${doc.excerpt}\n\nBy ${authorName}\n\nRead here: ${blogUrl}`;

          await sendBlogBroadcast({ subject, html, text, fromName: authorName });
        } catch (error) {
          console.error("Error sending blog publish notification:", error);
        }
      },
    ],
  },
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: ({ req }): boolean | {
      and?: Array<{ _status: { equals: string } }>;
      or?: Array<{ [key: string]: { equals?: string; contains?: string } }>;
    } => {
      if (!req.user) {
        return {
          and: [{ _status: { equals: "published" } }]
        };
      }

      if (checkIsCodespaceUser(req.user)) {
        return true;
      }

      return {
        or: [
          { author: { equals: req.user.id } },
          { collaborators: { contains: req.user.id } }
        ]
      };
    },
    create: ({ req }): boolean => {
      return !!req.user;
    },
    update: ({ req }): boolean | {
      or?: Array<{ [key: string]: { equals?: string; contains?: string } }>;
    } => {
      if (!req.user) return false;
      
      if (checkIsCodespaceUser(req.user)) {
        return true;
      }

      return {
        or: [
          { author: { equals: req.user.id } },
          { collaborators: { contains: req.user.id } }
        ]
      };
    },
    delete: ({ req }): boolean | {
      [key: string]: { equals: string };
    } => {
      if (!req.user) return false;
      
      if (checkIsCodespaceUser(req.user)) {
        return true;
      }

      return {
        author: { equals: req.user.id }
      };
    },
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "featuredImage",
      label: "Featured Image",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
    {
      name: "excerpt",
      label: "Excerpt",
      type: "textarea",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      label: "Tags",
      type: "text",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "isFeatured",
      label: "Set as featured post",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Display this post in the featured section. Only one post can be featured at a time.",
      },
    },
    {
      name: "postType",
      label: "Post Type",
      type: "select",
      defaultValue: "regular",
      options: [
        { label: "Regular Post", value: "regular" },
        { label: "Top Story", value: "top" },
        { label: "Featured Post", value: "featured" }
      ],
      required: false,
      admin: {
        position: "sidebar",
        condition: (data: { isFeatured?: boolean }) => Boolean(data?.isFeatured),
      },
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Tech & Processes", value: "tech" },
        { label: "People", value: "people" },
        { label: "Community", value: "community" },
        { label: "Events", value: "events" }
      ],
      required: false,
      admin: {
        position: "sidebar",
        condition: (data: { isFeatured?: boolean }) => Boolean(data?.isFeatured),
      },
    },
    {
      name: "author",
      type: "relationship",
      access: {
        update: () => false,
        read: () => true,
      },
      relationTo: "users",
      admin: {
        readOnly: true,
        position: "sidebar",
        condition: (data) => !!data?.author,
      },
      required: true,
    },
    {
      name: "collaborators",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Select co-authors for this blog post",
        position: "sidebar",
      },
    },
    {
      name: "updatedBy",
      type: "relationship",
      access: {
        update: () => false,
      },
      relationTo: "users",
      admin: {
        readOnly: true,
        position: "sidebar",
        condition: (data) => !!data?.updatedBy,
      },
      required: true,
    },
  ],
};