import { BlogsAPIResponse } from "@/types";
import Pagination from "./Pagination";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function AllBlogs({
  blogs,
}: {
  blogs: BlogsAPIResponse | undefined;
}) {
  return (
    <div className="px-2 xs:px-4 sm:px-8 md:px-14 mt-14 max-w-7xl mx-auto">
      <h3 className="text-3xl font-medium mb-6">All Blogs</h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.docs.map((blog) => (
          <div key={blog.id} className="relative">
            <Image
              className="h-[250px] bg-[#f8f8f8] rounded-[22px] w-auto"
              src={blog.featuredImage.url}
              width={blog.featuredImage.width}
              height={blog.featuredImage.height}
              alt={blog.featuredImage.alt}
            />
            <div className="flex flex-col gap-y-1 mt-5">
              <div className="flex items-center gap-x-[5.5px] text-neutral text-lg">
                <p>{blog.author.name}</p>
                <div className="h-[3px] w-[3px] rounded-full bg-neutral" />
                <p>{formatDate(blog.createdAt)}</p>
              </div>

              <h3 className="text-xl font-medium">{blog.title}</h3>
              <p className="text-lg text-neutral">
                A practical guide for Gen Z coders on the most popular tools
                used in the industry.
              </p>

              <button className="bg-primary px-5 py-4 text-white w-fit rounded-full mt-4">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-[#A6A6A6]/30 my-14" />
      <Pagination />
    </div>
  );
}
