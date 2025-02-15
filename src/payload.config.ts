import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Blog } from "./collections/Blog";
import { Gallery } from "./collections/Gallery";
import { UpcomingEvents } from "./collections/UpcomingEvents";
import { PastEvents } from "./collections/PastEvents";
// import { Forms } from "./collections/Forms";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
  collections: [Users, Media, Blog, Gallery, UpcomingEvents, PastEvents],
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
