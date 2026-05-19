import BrandsSection from "@/components/brands-section";
import { HeroImageCards } from "@/components/image-cards";
import JoinSection from "@/components/join-section";
import SpaceBadge from "@/components/space-badge";
import React from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const revalidate = 60;

async function getAlbums() {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "gallery",
    depth: 1,
    limit: 100,
  });

  return data;
}

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <>
      {/* Hero Section */}
      <Container className="container grid grid-cols-1 md:grid-cols-2 gap-5 py-5 md:py-20 content-center">
        <div className="space-y-3 md:space-y-5 flex-col flex justify-center">
          <SpaceBadge>CODE SPACE GALLERY</SpaceBadge>
          <h1 className="font-medium text-2xl md:text-5xl leading-normal">
            Who Can You Spot <br /> Here?
          </h1>
          <p className="text-xl subtitle">
            Events may end, but the fun memories, connections, and friendships
            you built live on. We keep those moments alive, right here.
          </p>
        </div>
        <div className="w-full relative aspect-[16/9] ">
          <HeroImageCards />
        </div>
      </Container>

      <Container className="container gap-5 py-5 md:pb-20 md:pt-8 mt-10 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {albums?.docs?.map((album: any) => (
            <Link
              href={album?.albumLink || "#"}
              key={album?.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[4/5] w-full relative">
                <Image
                  src={album?.coverImage?.url}
                  alt={album?.event || "Gallery Album"}
                  fill
                  className="object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                    {album?.event}
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-black transform transition-transform duration-300 hover:scale-105"
                  >
                    View Album
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Brands */}
      <BrandsSection />
      {/* Join the community */}
      <JoinSection />
    </>
  );
}
