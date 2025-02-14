import { checkIsCodespaceUser } from "@/lib/utils";
import { CollectionConfig } from "payload";

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
            // If setting this post as top story, update any existing top story to regular
            if (data.postType === 'top') {
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
              }).catch(err => {
                console.warn('Failed to update other top stories:', err);
                // Continue with the operation even if this update fails
              });
            }

            // If setting this post as featured, unset featured from other posts
            if (data.isFeatured) {
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
              }).catch(err => {
                console.warn('Failed to update other featured posts:', err);
                // Continue with the operation even if this update fails
              });
            }
          } catch (error) {
            console.error('Error in beforeChange hook:', error);
            // Continue with the operation even if the updates fail
          }

          return data;
        }
      },
    ],
  },
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: ({ req }) => {
      // If no user, only show published posts
      if (!req.user) {
        return {
          and: [{
            _status: {
              equals: "published"
            }
          }]
        };
      }

      // If Code Space admin, show all posts
      if (checkIsCodespaceUser(req.user)) {
        return true;
      }

      // Otherwise, only show user's own posts
      return {
        and: [{
          author: {
            equals: req.user.id
          }
        }]
      };
    },
    create: ({ req }) => {
      return !!req.user;
    },
    update: ({ req }) => {
      if (!req.user) return false;
      
      if (checkIsCodespaceUser(req.user)) {
        return true;
      }

      return {
        author: {
          equals: req.user.id,
        },
      };
    },
    delete: ({ req }) => {
      if (!req.user) return false;
      
      if (checkIsCodespaceUser(req.user)) {
        return true;
      }

      return {
        author: {
          equals: req.user.id,
        },
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