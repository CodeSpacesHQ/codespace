import GoalsCard from "@/components/goals-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { values, WhatWeDo, why_us } from "@/data";
import { ArrowRightIcon } from "lucide-react";
import Container from "@/components/container";

const AboutUs = () => {
  return (
    <>
      <Container className="container flex space-x-20 py-5 md:py-20">
        <div className="space-y-3 flex-col flex justify-center max-w-[620px]">
          <span className="text-primary font-semibold">ABOUT US</span>

          <p className="text-xl md:text-2xl text-gray-800 text-balance leading-normal">
            Code Space is a tech-driven community empowering Gen Z tech talents
            across Africa with resources, mentorship, and global opportunities,
            fostering a supportive ecosystem for growth and career success.
          </p>
        </div>
      </Container>
      <section className="min-h-screen bg-foreground">
        <Container className="container h-full flex flex-col justify-between bg-cover py-10 md:py-20 bg-top bg-no-repeat gap-x-5 gap-y-12">
          <div className="space-y-4 w-full sm:w-1/2">
            <h3 className="text-3xl text-white font-normal">Our Mission</h3>
            <p className="text-white w-full sm:w-4/5">
              To help Gen Z tech talents across Africa reach their full
              potential by connecting them to resources, mentorship, and a
              supportive community that accelerates their tech careers and
              unlocks global opportunities.
            </p>
            <Button variant={"white"} className="text-foreground">
              Get Involved
            </Button>
          </div>

          <div className="space-y-4 w-full sm:w-2/5 self-end">
            <h3 className="text-3xl text-white font-normal">Our Vision</h3>
            <p className="text-white w-full ">
              A thriving ecosystem where every Gen Z tech talent in Africa has
              the support, resources, and global opportunities to build
              impactful careers and drive the future of technology.
            </p>
            <Button variant={"white"} className="text-foreground">
              Get Involved
            </Button>
          </div>
        </Container>
        {/* Values */}
        <Container className="container py-20 w-full">
          <div className="space-y-5">
            <Badge>
              <div className="size-1.5 rounded-full bg-primary" />
              VALUES
            </Badge>
            <h1 className="font-medium text-2xl leading-normal sm:w-4/5 text-white ">
              Our Values
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((item) => (
                <GoalsCard
                  variant="dark"
                  {...(item as WhatWeDo)}
                  key={item.title}
                />
              ))}
            </div>
          </div>
        </Container>
        <Container className="container py-20 space-y-10">
          <h3 className="text-center text-white text-3xl">Why Roll with us?</h3>
          <Accordion type="single">
            {why_us.map((data, i) => (
              <AccordionItem
                value={i.toString()}
                key={i}
                className="border-white/10"
              >
                <AccordionTrigger
                  className="flex items-center justify-between w-full"
                  indicator={false}
                >
                  <h1 className="text-white text-2xl md:text-4xl font-light text-left">
                    {data.title}
                  </h1>
                  <div className="size-11 rounded-full border-white border flex items-center justify-center">
                    <ArrowRightIcon className="text-white" size={14} />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  {data.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
        <section className="container py-20">
          <div className="space-y-5 flex flex-col items-center justify-center max-w-xl mx-auto text-center">
            <h3 className="text-4xl font-light text-white">Become a Member</h3>
            <p className="text-gray-400 text-lg">
              Be part of a community that prioritizes you, and your career
              growth. Join us, and connect with thousands of African tech
              talents on their journey.
            </p>
            <Button variant={"white"} asChild>
              <a href="https://forms.gle/hhuLVupnm2F1AGa96" target="_blank" rel="noopener noreferrer">
                Join Us
              </a>
            </Button>
          </div>
        </section>
      </section>
    </>
  );
};

export default AboutUs;
