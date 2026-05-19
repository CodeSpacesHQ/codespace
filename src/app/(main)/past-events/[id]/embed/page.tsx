import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDateWithComma } from "@/lib/utils";
import { PastEvent } from "@/types";

async function getPastEvent(id: string) {
    const APP_URL = process.env.APP_URL || "https://codespaces.org";

    try {
        const response = await fetch(`${APP_URL}/api/past-events/${id}`, {
            next: { revalidate: 0 },
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

interface Props {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const event = await getPastEvent(resolvedParams.id);

    if (!event) {
        notFound();
    }

    return (
        <div className="container space-y-2 py-20">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                PAST
            </div>
            <h1 className="font-normal text-2xl leading-normal">Past Events</h1>
            <p className="text-xl subtitle sm:w-4/6">
                Relive the excitement of our past events and explore the
                thought-provoking moments that inspired innovation and growth. You
                never know, you might discover a fresh insight or two!
            </p>
            <div className="w-full space-y-10 !mt-10">
                <div className="w-full flex md:flex-row flex-col gap-10">
                    <div className="w-full max-w-sm flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-white p-3 rounded-sm">
                        <div className="w-full h-full relative">
                            <Image
                                src={event.coverImage.url}
                                alt={event.eventTitle}
                                fill
                                className="object-cover rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="py-5 flex flex-col space-y-2 justify-around">
                        <h2 className="text-2xl font-normal">{event.eventTitle}</h2>
                        <p className="text-xl text-gray-700 font-light">{event.description}</p>
                        <p className="text-lg">
                            Date{" "}
                            <span className="text-gray-600 ml-2">
                                {formatDateWithComma(event.date)}
                            </span>
                        </p>
                        <a
                            href={event.recapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-fit"
                        >
                            {event.callToAction || "Watch the replay!"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 