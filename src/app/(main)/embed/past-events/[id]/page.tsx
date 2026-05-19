import { notFound } from "next/navigation";
import Image from "next/image";
import { PastEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Format date function to match the one in events page
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const daySuffix = (day: number) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${daySuffix(day)} ${month}, ${year}`;
};

async function getPastEvent(id: string) {
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

    try {
        const response = await fetch(`${APP_URL}/api/past-events/${id}`, {
            next: { revalidate: 0 },
            cache: 'no-store'
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data as PastEvent;
    } catch (error) {
        console.error("Error fetching past event:", error);
        return null;
    }
}

// Image fallback component
const ImageFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    </div>
);

// Set metadata for iframes
export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
    title: 'Code Space Event',
    referrer: 'no-referrer',
};

// Configure dynamic rendering for embed
export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const event = await getPastEvent(resolvedParams.id);

    if (!event) {
        notFound();
    }

    // Extract image URL with fallback
    const imageUrl = event.coverImage?.url || '';

    return (
        <div className="w-full p-6 bg-white">
            <div className="w-full flex md:flex-row flex-col gap-10">
                <div className="w-full md:max-w-sm max-w-full flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-white p-3 rounded-sm">
                    <Suspense fallback={<ImageFallback />}>
                        <div className="w-full h-full relative overflow-hidden">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={event.eventTitle}
                                    fill
                                    unoptimized={true}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    priority={true}
                                    className="object-cover rounded-sm"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement?.classList.add('image-error');
                                    }}
                                />
                            ) : (
                                <ImageFallback />
                            )}
                        </div>
                    </Suspense>
                </div>
                <div className="py-5 flex flex-col space-y-2 justify-around">
                    <h2 className="text-2xl font-normal">{event.eventTitle}</h2>
                    <p className="text-xl text-gray-700 font-light">{event.description}</p>
                    <Badge>{formatDate(event.date)}</Badge>
                    <Button asChild className="w-fit">
                        <a
                            href={event.recapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {event.callToAction || "Watch the replay!"}
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
} 