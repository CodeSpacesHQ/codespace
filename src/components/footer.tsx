import React from "react";
import { LogoLarge } from "./brand";
import Link from "next/link";
import Container from "@/components/container";
import NewsletterForm from "@/components/newsletter-form";
import { other_links, quick_links, socials } from "@/data";


const Footer = () => {
  return (
    <Container className="container grid grid-cols-2 md:grid-cols-7 gap-10">
      <div className="col-span-2 w-full space-y-5 ">
        <LogoLarge />
        <p className="text-base text-gray-500">
          Code Space is a nonprofit community fiscally sponsored by The Hack Foundation Nonprofit EIN: 81-2908499.
        </p>
      </div>
      <ul className="space-y-2 col-span-1">
        <li className="text-primary text-lg font-medium mb-3">
          Reach out to us
        </li>
        {socials.map((social) => (
          <li key={social.name} className="hover:text-primary">
            <Link href={social.url} className="capitalize">
              {social.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        <li className="text-primary text-lg font-medium mb-3">Quick Links</li>
        {quick_links.map((social) => (
          <li key={social.name} className="hover:text-primary">
            <Link href={social.href} className="capitalize">
              {social.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        <li className="text-primary text-lg font-medium mb-3">Others</li>
        {other_links.map((social) => (
          <li key={social.name} className="hover:text-primary">
            <Link href={social.href} className="capitalize">
              {social.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="col-span-2 space-y-5">
        <h4 className="text-primary text-lg font-medium">
          Subscribe to our Newsletter
        </h4>
        <NewsletterForm />
      </div>
      <div className="col-span-2 md:col-span-7 py-5 border-t">
        <p className="text-center text-gray-500 font-normal">
          Copyright ©{" "} {new Date().getFullYear()} Code Space |  All rights reserved.
        </p>
      </div>
    </Container>
  );
};

export default Footer;
