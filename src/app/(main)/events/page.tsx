import { Logo } from "@/components/brand";
import BrandsSection from "@/components/brands-section";
import JoinSection from "@/components/join-section";
import SpaceBadge from "@/components/space-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import classNames from "classnames";
import Image from "next/image";
import Container from "@/components/container";
import {
  PastEvent,
  PastEvents,
  type UpcomingEvent,
  type UpcomingEvents,
} from "@/types";
import Script from "next/script";

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

async function getPastEvents() {
  const BASE_URL = process.env.BASE_URL;

  const response = await fetch(`${BASE_URL}/api/past-events`, {
    next: { revalidate: 0 },
  });
  const data: PastEvents = await response.json();

  return data;
}

async function getUpcomingEvents() {
  const BASE_URL = process.env.BASE_URL;

  const response = await fetch(`${BASE_URL}/api/upcoming-events`, {
    next: { revalidate: 0 },
  });
  const data: UpcomingEvents = await response.json();

  return data;
}

export default async function Events() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org";

  // Fetch events using the existing functions
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getPastEvents();

  // Prepare JSON-LD structured data for events
  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      ...upcomingEvents.docs.map((event: UpcomingEvent, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.eventTitle,
          description: event.description,
          startDate: event.date,
          endDate: event.date,
          location: {
            "@type": "VirtualLocation",
            url: event.eventLink,
          },
          organizer: {
            "@type": "Organization",
            name: "Code Space",
            url: baseUrl,
          },
          image: event.coverImage?.url,
          url: `${baseUrl}/events#${event.id}`,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        },
      })),
      ...pastEvents.docs.map((event: PastEvent, index: number) => ({
        "@type": "ListItem",
        position: upcomingEvents.docs.length + index + 1,
        item: {
          "@type": "Event",
          name: event.eventTitle,
          description: event.description,
          startDate: event.date,
          endDate: event.date,
          location: {
            "@type": "VirtualLocation",
            url: event.recapLink,
          },
          organizer: {
            "@type": "Organization",
            name: "Code Space",
            url: baseUrl,
          },
          image: event.coverImage?.url,
          url: `${baseUrl}/events#${event.id}`,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        },
      })),
    ],
  };

  return (
    <>
      <Script
        id="events-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      {/* Hero Section */}
      <Container className="container gap-5 py-5 md:py-20 ">
        <div className="space-y-5 flex-col flex justify-center items-center text-center sm:w-1/2 mx-auto">
          <Logo className="scale-75" />
          <SpaceBadge>CODE SPACE EVENTS</SpaceBadge>
          <h1 className="font-medium text-3xl md:text-5xl leading-snug">
            We Are Always Cooking Something New!
          </h1>
          <p className="text-xl subtitle font-normal">
            When we host tech events, they inspire and transform careers. Save
            the date for upcoming events and catch the live stream replays of
            our past sessions.
          </p>
        </div>
      </Container>
      {/* what we do */}
      <Container className="container space-y-2 py-20">
        <SpaceBadge>UPCOMING</SpaceBadge>
        <h1 className="font-normal text-2xl leading-normal">Upcoming Events</h1>
        <p className="text-xl subtitle sm:w-1/2">
          Join us for our upcoming events at Code Space, where you can connect,
          learn, and elevate your tech journey!
        </p>
        <div className="w-full space-y-10 !mt-10">
          {upcomingEvents?.docs?.map((event, index) => (
            <UpcomingEvent key={event.id} event={event} priority={index === 0} />
          ))}
        </div>
      </Container>

      <Container className="container space-y-2">
        <SpaceBadge>PAST</SpaceBadge>
        <h1 className="font-normal text-2xl leading-normal">Past Events</h1>
        <p className="text-xl subtitle sm:w-4/6">
          Relive the excitement of our past events and explore the
          thought-provoking moments that inspired innovation and growth. You
          never know, you might discover a fresh insight or two!
        </p>
        <div className="w-full space-y-10 !mt-10">
          {pastEvents?.docs?.map((event) => (
            <EventCard key={event.id} event={event} />
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

const EventCard = ({ event }: { event: PastEvent }) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-10">
      <div className="w-full max-w-sm flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-white p-3 rounded-sm">
        <div className="w-full h-full relative">
          <Image
            src={event?.coverImage?.url}
            alt={event?.eventTitle}
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="py-5 flex flex-col space-y-2 justify-around">
        <h2 className="text-2xl font-normal">{event?.eventTitle}</h2>
        <p className="text-xl text-gray-700 font-light">{event?.description}</p>
        <Badge>{formatDate(event?.date)}</Badge>
        <Button asChild className="w-fit">
          <Link href={event?.recapLink}>
            {event?.callToAction || "Watch the replay!"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

const UpcomingEvent = ({ event, priority = false }: { event: UpcomingEvent; priority?: boolean }) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-10">
      <div className="w-full md:max-w-sm max-w-full lg:max-h-full mx-auto flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-white p-3 md:max-h-[440px] object-cover">
        <div className="w-full h-full relative">
          <Image
            src={event?.coverImage.url}
            alt={event?.eventTitle}
            fill
            className="object-cover h-full w-auto"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="py-5 flex flex-col space-y-2 justify-around">
        <h2 className="text-2xl font-normal">{event?.eventTitle}</h2>
        <p className="text-lg text-gray-700 font-light">{event?.description}</p>
        <p className="text-lg">
          Date{" "}
          <span className="text-gray-600 ml-2">{formatDate(event?.date)}</span>
        </p>
        <p className="text-lg">
          Location <span className="text-gray-600 ml-2">{event?.location}</span>
        </p>
        {event?.stats && (
          <div className="w-full max-w-xs flex flex-row items-center divide-x">
            {event?.stats?.map((stat, i) => (
              <div
                key={i}
                className={classNames("flex-grow", {
                  "flex flex-col items-center justify-center": i !== 0,
                })}
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
        <Button asChild className="w-fit">
          <Link href={event?.eventLink}>{event?.callToAction}</Link>
        </Button>
      </div>
    </div>
  );
};
