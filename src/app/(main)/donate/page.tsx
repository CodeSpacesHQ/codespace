import BrandsSection from "@/components/brands-section";

import { HeroImageCards } from "@/components/image-cards";
import JoinSection from "@/components/join-section";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

import React from "react";

const Donate = () => {
  return (
    <>
      <Container className="container grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5 md:pt-20 content-center">
        <div className="space-y-5 flex-col flex  justify-center">
          <Badge>
            <div className="size-1.5 rounded-full bg-primary" />
            DONATE
          </Badge>
          <p className="text-lg md:text-xl text-gray-800  leading-normal">
            A lack of resources should never stand in the way of reaching
            one&apos;s full potential. But for many tech talents, it does. When
            you sponsor a Code Spacer you break that barrier and help someone to
            become a step closer to fulfilling their dreams. Wouldn&apos;t you
            like to take that chance?
          </p>
          <p className="text-lg md:text-xl text-gray-800  leading-normal">
            If you donate as little as $5, you help a Code Spacer get access to
            data for a month. A $150 - $200 donation opens the door to tech
            training and mentorship, allowing a Code Spacer to thrive.{" "}
          </p>
          <p className="text-lg md:text-xl text-gray-800  leading-normal">
            And with your continued generosity, we can get Code Spacers laptops
            to ensure their careers are not put on hold because of a lack of
            essential resources. Together, we can keep a Code Spacer&apos;s
            dream alive!
          </p>
          <Button className="w-fit">Donate Today</Button>
        </div>
        <div className="w-full relative aspect-[16/10] hidden lg:flex">
          <HeroImageCards />
        </div>
      </Container>
      <BrandsSection />
      <JoinSection />
    </>
  );
};

export default Donate;
