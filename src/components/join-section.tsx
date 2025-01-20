import Image from "next/image";
import { Button } from "./ui/button";
import Container from "@/components/container";

const JoinSection = () => {
  return (
    <Container className="container flex flex-col lg:flex-row items-center mb-20 gap-x-20 gap-y-10">
      <div className="w-full md:max-w-80 max-w-full lg:max-h-full flex-shrink-0 shadow-[0_0_20px_0_rgba(34,34,34,0.05)] aspect-[10/11] bg-white p-3 md:max-h-[440px] object-cover">
        <div className="w-full h-full relative">
          <Image
            src={"/images/isabella.jpg"}
            alt={"Isabella @ 2024 Fusion Tech Fest"}
            fill
            className="object-cover h-full w-auto"
          />
        </div>
      </div>
      <div className="space-y-5 flex flex-col max-w-xl">
        <h3 className="text-xl text-primary font-medium">JOIN CODE SPACE!!</h3>
        <p className="text-gray-800 text-2xl sm:text-3xl font-duplicateSans">
          Be a part of our ever growing community by joining our Telegram
          channel and getting periodic updates.
        </p>
        <Button className="w-fit">Join the community</Button>
      </div>
    </Container>
  );
};

export default JoinSection;
