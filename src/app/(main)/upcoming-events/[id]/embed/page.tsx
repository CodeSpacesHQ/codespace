import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDateWithComma } from "@/lib/utils";
import { UpcomingEvent } from "@/types";

async function getUpcomingEvent(id: string) {
    const APP_URL = process.env.APP_URL || "https://codespaces.org";

    try {
        const response = await fetch(`${APP_URL}/api/upcoming-events/${id}`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data as UpcomingEvent;
    } catch (error) {
        console.error("Error fetching upcoming event:", error);
        return null;
    }
}

interface Props {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const event = await getUpcomingEvent(resolvedParams.id);

    if (!event) {
        notFound();
    }

    return (
        <div className="container space-y-2 py-20">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                UPCOMING
            </div>
            <h1 className="font-normal text-2xl leading-normal">Upcoming Events</h1>
            <p className="text-xl subtitle sm:w-1/2">
                Join us for our upcoming events at Code Space, where you can connect,
                learn, and elevate your tech journey!
            </p>
            <div className="w-full space-y-10 !mt-10">
                <div className="w-full flex md:flex-row flex-col gap-10">
                    <div className="w-full md:max-w-sm max-w-full lg:max-h-full mx-auto flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-white p-3 md:max-h-[440px] object-cover">
                        <div className="w-full h-full relative">
                            <Image
                                src={event.coverImage.url}
                                alt={event.eventTitle}
                                fill
                                className="object-cover h-full w-auto"
                            />
                        </div>
                    </div>
                    <div className="py-5 flex flex-col space-y-4">
                        <h2 className="text-2xl font-normal">{event.eventTitle}</h2>
                        <p className="lg:text-lg text-gray-700 font-light">
                            {event.description}
                        </p>
                        <p className="text-lg">
                            Date{" "}
                            <span className="text-gray-600 ml-2">
                                {formatDateWithComma(event.date)}
                            </span>
                        </p>
                        <p className="text-lg">
                            Location <span className="text-gray-600 ml-2">{event.location}</span>
                        </p>
                        {event.stats && (
                            <div className="w-full max-w-xs flex flex-row items-center divide-x">
                                {event.stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className={`flex-grow ${i !== 0 ? "flex flex-col items-center justify-center" : ""}`}
                                    >
                                        <div>
                                            <h4 className="text-xl font-semibold">
                                                {stat.statValue}{" "}
                                                <span className="text-primary text-base">+</span>
                                            </h4>
                                            <p className="subtitle">{stat.statTitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <a
                            href={event.eventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-fit"
                        >
                            {event.callToAction || "Register Now"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 