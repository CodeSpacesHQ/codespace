"use client";
import useSwr from "swr";
import BrandsSection from "@/components/brands-section";
import GoalsCard from "@/components/goals-card";
import ImageCard from "@/components/image-card";
import JoinSection from "@/components/join-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stats, what_we_do } from "@/data";
import { CalendarClock, CirclePlayIcon } from "lucide-react";
import SpaceBadge from "@/components/space-badge";
import Link from "next/link";
import { cn, fetcher, formatDateWithComma } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/container";
import Image from "next/image";
import { motion } from "framer-motion";
import { UpcomingEvent, UpcomingEvents } from "@/types";
import VideoPlayer from "@/components/ui/video";

interface Stat {
  name: string;
  value: number | string;
  suffix: string;
  description?: string;
}

interface AnimatedValueProps {
  value: number | string;
  suffix?: string;
}

const AnimatedValue = ({ value, suffix = "" }: AnimatedValueProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const endValue = Number(value);
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const valueIncrement = endValue / totalFrames;

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const currentValue = Math.min(Math.round(valueIncrement * currentFrame), endValue);
      setCount(currentValue);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [value, isVisible]);

  return (
    <span ref={ref} className="inline-flex">
      {count}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

const Home = () => {
  const { data: upcomingEvents, isLoading } = useSwr<UpcomingEvents>(
    "/api/upcoming-events",
    fetcher
  );

  return (
    <>
      {/* Hero Section */}
      <Container className="text-center flex flex-col container gap-5 py-10 md:pb-32 md:pt-16 content-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 md:space-y-5 flex-col flex items-start text-left md:text-center md:justify-center w-full md:items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/letter">
              <SpaceBadge>Read clinton&apos;s letter</SpaceBadge>
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-3xl sm:text-4xl lg:text-5xl max-w-4xl"
          >
            Connecting African Gen Zs for Growth, Impact, and Success.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl subtitle max-w-2xl"
          >
            We unite Gen Zs in tech across Africa, creating a vibrant community
            where you can thrive with like-minded peers, share insights, and
            gain support to grow, build, and accelerate your career.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-5 sm:flex-row flex-col sm:w-auto w-full"
          >
            <Button className="w-full md:w-fit hover:scale-105 transition-transform" asChild>
              <a href="https://forms.gle/hhuLVupnm2F1AGa96" target="_blank" rel="noopener noreferrer">
                Join the Community
              </a>
            </Button>
            <Button
              variant={"ghost"}
              className="[&_svg]:size-6 w-full md:w-fit hover:scale-105 transition-transform"
              asChild
            >
              <a href="https://www.youtube.com/live/DNI2ewOZMTo?si=Vc7QacMn8C9jrQvQ" target="_blank" rel="noopener noreferrer">
                <CirclePlayIcon strokeWidth={1.5} size={30} />
                Watch 2024 Events
              </a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative w-full mt-8"
        >
          <VideoPlayer
            src="https://res.cloudinary.com/djar0mexx/video/upload/v1749445414/cla8vipy2kkaaquicexh.mp4"
            autoPlay
            youtubeLink="https://www.youtube.com/watch?v=9wDcD6T6OqY&t=2s"
          />
        </motion.div>
      </Container>

      <section className="h-full bg-[#5c5ad1] flex items-center">
        <Container className="h-full flex flex-col bg-cover py-20 bg-top bg-no-repeat bg-[url('/images/what-we-do-bg.svg')]">
          <div className="space-y-4 w-full md:max-w-sm lg:max-w-md">
            <h3 className="text-3xl text-white font-normal">Our Mission</h3>
            <p className="text-white w-full">
              We are a nonprofit community empowering Gen Z through mentorship,
              education, and global tech opportunities. We believe in the power
              of technology to change the world, and we are here to help the
              next generation lead the charge.
            </p>
            <Button variant={"white"}>Get Involved</Button>
          </div>

          <div className="space-y-4 w-full md:max-w-sm lg:max-w-md self-end mt-16">
            <h3 className="text-3xl text-white font-normal">
              NETWORK. GROW. BUILD.
            </h3>
            <p className="text-white w-full">
              We&apos;re all about empowering Code Spacers to thrive beyond
              Africa. By connecting you to global opportunities and equipping
              you with essential resources such as job opportunities,
              mentorship, tech upskilling, data, laptops, and more, we help you
              unlock your full potential and propel your career forward.
            </p>
            <Button variant={"white"}>Get Involved</Button>
          </div>
        </Container>
      </section>
      <Container className="container py-10 w-full">
        <div className="space-y-5">
          <Badge>
            <div className="size-1.5 rounded-full bg-primary" />
            CODE SPACE
          </Badge>
          <h1 className="font-medium text-2xl leading-normal sm:w-4/5 ">
            What We Do
          </h1>
          <p className="text-lg sm:max-w-lg">
            We are driving the future forward by ensuring that Gen Z tech
            talents across Africa can access the resources they need to thrive.
            We are on a mission to connect, empower, and accelerate the careers
            of Africa&apos;s next generation of tech leaders.
          </p>
          <p className="text-lg">
            {" "}
            Here&apos;s how we&apos;re making that happen:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5">
            {what_we_do.map((item) => (
              <GoalsCard {...item} key={item.title} />
            ))}
          </div>
          <div className="!my-20 w-full flex justify-center">
            <Button className="mx-auto" asChild>
              <Link href="/about-us">Explore more</Link>
            </Button>
          </div>
        </div>
      </Container>
      {/* Goals */}
      <Container className="container md:grid grid-cols-1 md:grid-cols-3 gap-5 hidden">
        <h1 className="md:text-5xl text-4xl col-span-1 font-duplicateSans">
          Our Goals
        </h1>
        <div className="flex col-span-2">
          <svg
            className="inline flex-shrink-0 md:scale-100 scale-50"
            width={44}
            height={39}
            viewBox="0 0 44 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.3073 26.5394C41.6247 21.8601 38.511 19.1986 33.9421 19.2595C32.2878 17.2195 30.142 12.3965 34.793 3.21808C25.8023 9.59195 17.034 36.9141 34.793 35.7998C39.1164 35.5285 42.99 31.2188 42.3073 26.5394Z"
              stroke="#989898"
              strokeWidth={3}
            />
            <path
              d="M19.5587 28.9339C19.5756 24.2048 16.8898 21.1094 12.3625 20.4897C11.0282 18.2262 9.98222 10.3848 15.9389 2C6.10522 6.96549 -6.96916 35.433 10.7581 36.9737C15.0738 37.3488 19.5418 33.6631 19.5587 28.9339Z"
              stroke="#989898"
              strokeWidth={3}
            />
          </svg>

          <p className="p-2 text-lg md:text-2xl">
            Our goal is to create a unified platform that connects tech-savvy
            teenagers from all over Africa. We aim to provide a space where they
            can come together to share opportunities, collaborate on impressive
            projects, and forge meaningful relationships. By fostering this
            community, we strive to empower young african tech enthusiasts and
            nurture their passion for innovation and growth.
          </p>

          <svg
            className="inline flex-shrink-0 md:scale-100 scale-50 self-end"
            width="44"
            height="37"
            viewBox="0 0 44 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91287 11.0323C2.58806 15.6605 5.66778 18.2929 10.1868 18.2327C11.8231 20.2504 14.787 25.2871 10.1868 34.3653C19.0794 28.061 26.9104 0.770927 9.34526 1.87303C5.06901 2.14135 1.23769 6.40405 1.91287 11.0323Z"
              stroke="#989898"
              strokeWidth="3"
            />
            <path
              d="M24.5167 9.81324C24.5001 14.4907 27.1565 17.5523 31.6344 18.1652C32.9542 20.404 34.1208 26.955 28.229 35.2482C37.9555 30.3369 50.7551 3.38517 33.2212 1.86133C28.9527 1.49035 24.5334 5.13578 24.5167 9.81324Z"
              stroke="#989898"
              strokeWidth="3"
            />
          </svg>
        </div>
      </Container>
      {/* Upcoming Events */}
      <Container className="container space-y-2">
        <SpaceBadge>UPCOMING</SpaceBadge>
        <h1 className="font-normal text-xl md:text-2xl lg:text-3xl leading-normal font-duplicateSans">
          Upcoming Events
        </h1>
        <p className="sm:text-lg subtitle sm:w-1/2">
          Join us for our upcoming events at Code Space, where you can connect,
          learn, and elevate your tech journey!
        </p>
        <div className="w-full space-y-10 !mt-10">
          {isLoading ? (
            <EventSkeleton />
          ) : upcomingEvents?.docs?.length ? (
            <EventCard
              key={upcomingEvents?.docs[0]?.id}
              event={upcomingEvents?.docs[0] as UpcomingEvent}
            />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white">
                <CalendarClock />
              </div>
              <p className="text-2xl font-medium text-primary">
                No Upcoming Events
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* milestones */}
      <Container className="container py-20 space-y-20">
        <div className="space-y-3 relative flex flex-col items-center justify-center text-center w-full sm:w-3/4 md:w-1/2 mx-auto">
          <svg
            className="absolute -right-10 sm:-right-10 top-0 scale-50 sm:scale-75 md:scale-100"
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.2439 63.4598C35.5513 61.1617 41.9779 51.1104 42.78 50.6427C45.1561 49.2566 78.4211 50.3359 82.9727 53.0965C84.7606 54.1807 91.686 67.3308 91.686 68.9246C91.686 69.9315 74.772 70.745 71.8444 70.8909C68.4657 71.0596 61.1207 70.5906 53.7591 68.9246C47.7268 67.559 41.8206 65.6756 35.5513 64.9489C35.4025 64.9314 39.0821 71.0664 42.78 76.3756C44.5048 78.8531 56.2282 101.145 57.8509 101.877C59.4733 102.61 88.2072 71.7216 91.9629 69.0504"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M71.5878 71.4255C67.6849 79.7273 60.6737 95.5743 59.4731 100.325"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M54.7012 71.03C55.9345 80.7992 57.6083 90.6223 58.7393 100.325"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M57.2706 49.2566C54.9771 55.7514 55.6567 63.0853 54.7012 69.8421"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M70.4866 50.8401C71.119 56.706 70.3159 67.5324 72.3222 71.4256"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M25.0928 49.2563C22.4589 47.4749 20.134 45.7661 19.825 45.6936"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M41.8516 34.213C40.7808 32.085 41.8516 32.3729 40.1155 29.4038"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M69.0313 36.1926C68.6069 33.6173 69.0355 30.8256 69.1883 28.2749"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M89.9434 42.1307C91.9626 40.5473 92.5398 39.818 93.9815 38.9639"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M106.463 65.4874C108.299 64.9928 108.915 65.0952 110.135 64.4978"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M96.9192 95.1782C97.861 96.1418 98.6524 97.2771 99.489 98.3454"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.503384"
              d="M21.6605 74.7883C21.1568 75.3854 20.434 75.5849 19.825 75.9808"
              stroke="#5B5AD1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <SpaceBadge>MILESTONES</SpaceBadge>
          <h3 className="text-2xl sm:text-3xl font-medium">Our Reach So Far</h3>
          <p className="text-lg sm:text-xl">
            Your Tech Journey is much <br /> Smoother with Us!
          </p>
        </div>

        {stats.map((stat: Stat) => (
          <div
            key={stat.name}
            className="w-full flex flex-col gap-5 md:flex-row border-b py-5 justify-between items-start md:items-end"
          >
            <h4 className="text-3xl sm:text-5xl font-light">
              <AnimatedValue value={stat.value} suffix={stat.suffix} /> <br />
              {stat.name}
            </h4>

            <p className="w-full md:max-w-md lg:max-w-lg md:text-right text-balance text-lg font-light">
              {stat.description}
            </p>
          </div>
        ))}
      </Container>
      {/* sponsor */}
      <Container className="container pb-20 gap-5">
        <div className="flex md:flex-row flex-col justify-between">
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <h1 className="text-3xl text-center sm:text-left">
              Sponsor a Code Spacer
            </h1>
            <Button className="font-normal" asChild>
              <Link href="/donate">Donate Today</Link>
            </Button>
          </div>
          <p className="md:text-right sm:text-left sm:mx-0 text-sm sm:text-base md:text-lg text-balance font-light lg:max-w-lg mx-auto text-center mt-8 md:mt-0 md:max-w-md">
            A lack of resources should never stand in the way of reaching
            one&apos;s full potential. But for many tech talents, it does. When
            you sponsor a Code Spacer you break that barrier and help someone to
            become a step closer to fulfilling their dreams. Wouldn&apos;t you
            like to take that chance? If you donate as little as $5, you help a
            Code Spacer get access to data for a month. A $150 - $200 donation
            opens the door to tech training and mentorship, allowing a Code
            Spacer to thrive. And with your continued generosity, we can get
            Code Spacers laptops to ensure their careers are not put on hold
            because of a lack of essential resources. Together, we can keep a
            Code Spacer&apos;s dream alive!
          </p>
        </div>
        <div className="w-full aspect-video relative mt-20">
          <ImageCard
            src={"/images/hackathon.png"}
            className="sm:w-1/2 absolute top-1/2 right-4 sm:right-14 aspect-[6/4] -mt-20 rotate-[9deg] [&>#image-card]:h-[90%] shadow-[0_0_50px_0_rgba(34,34,34,0.05)]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <ImageCard
            src={"/images/hackathon.png"}
            className="sm:w-1/2 absolute -top-16 sm:top-0 left-4 sm:left-14 aspect-[6/4] -rotate-3 [&>#image-card]:h-[90%] shadow-[0_0_50px_0_rgba(34,34,34,0.05)]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Container>
      {/* Brands */}
      <BrandsSection />
      {/* Join the community */}
      <JoinSection />
    </>
  );
};

export default Home;

const EventSkeleton = () => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-10 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full md:max-w-sm max-w-full lg:max-h-full mx-auto flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-gray-200 p-3 md:max-h-[440px]" />

      {/* Content skeleton */}
      <div className="py-5 flex flex-col space-y-4 w-full">
        {/* Title skeleton */}
        <div className="h-8 bg-gray-200 rounded-full w-3/4" />

        {/* Description skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-full w-full" />
          <div className="h-4 bg-gray-200 rounded-full w-full" />
          <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        </div>

        {/* Date skeleton */}
        <div className="flex items-center">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-32 ml-2" />
        </div>

        {/* Location skeleton */}
        <div className="flex items-center">
          <div className="h-6 bg-gray-200 rounded-full w-20" />
          <div className="h-6 bg-gray-200 rounded-full w-40 ml-2" />
        </div>

        {/* Stats skeleton */}
        <div className="w-full max-w-xs flex flex-row items-center divide-x divide-gray-200">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex-grow flex flex-col items-center justify-center p-2"
            >
              <div className="h-6 bg-gray-200 rounded-full w-16 mb-1" />
              <div className="h-4 bg-gray-200 rounded-full w-20" />
            </div>
          ))}
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded-full w-32" />
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: UpcomingEvent }) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-10">
      <div className="w-full md:max-w-sm max-w-full lg:max-h-full mx-auto flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-square bg-white p-3 md:max-h-[440px] object-cover">
        <div className="w-full h-full relative">
          <Image
            src={event?.coverImage?.url}
            alt={event?.eventTitle}
            fill
            className="object-cover h-full w-auto"
          />
        </div>
      </div>
      <div className="py-5 flex flex-col space-y-4">
        <h2 className="text-2xl font-normal">{event?.eventTitle}</h2>
        <p className="lg:text-lg text-gray-700 font-light">
          {event?.description}
        </p>
        <p className="text-lg">
          Date{" "}
          <span className="text-gray-600 ml-2">
            {formatDateWithComma(event?.date)}
          </span>
        </p>
        <p className="text-lg">
          Location <span className="text-gray-600 ml-2">{event?.location}</span>
        </p>
        {event?.stats && (
          <div className="w-full max-w-xs flex flex-row items-center divide-x">
            {event?.stats.map((stat, i) => (
              <div
                key={i}
                className={cn("flex-grow", {
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
          <Link href={event?.eventLink}>
            {event?.callToAction || "Register Now"}
          </Link>
        </Button>
      </div>
    </div>
  );
};
