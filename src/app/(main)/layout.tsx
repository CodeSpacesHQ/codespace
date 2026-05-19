import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smoothscroll";
import ScrollToTop from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const duplicateSans = localFont({
  src: [
    {
      path: "../fonts/DuplicateSans-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../fonts/DuplicateSans.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/DuplicateSans-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../fonts/DuplicateSans-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/DuplicateSans-Heavy.ttf",
      weight: "800",
      style: "Heavy",
    },
  ],
  variable: "--duplicate-sans",
});

const graphikSans = localFont({
  src: [
    {
      path: "../fonts/Graphik/GraphikLight.otf",
      weight: "300",
      style: "Heavy",
    },
    {
      path: "../fonts/Graphik/GraphikRegular.otf",
      weight: "400",
      style: "light",
    },
    {
      path: "../fonts/Graphik/GraphikMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Graphik/GraphikSemibold.otf",
      weight: "600",
      style: "medium",
    },
    {
      path: "../fonts/Graphik/GraphikBold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org"
  ),
  title: {
    default: "Code Space - Africa's Premier Gen Z Tech Community & Innovation Hub",
    template: "%s | Code Space",
  },
  description:
    "Code Space is Africa's leading Gen Z tech community, empowering young tech talents through mentorship, events, and networking. Join our vibrant ecosystem of innovators, developers, and tech enthusiasts to accelerate your tech career and shape Africa's digital future.",
  keywords: [
    "Code Space",
    "Tech Community Africa",
    "Gen Z Tech",
    "African Tech Community",
    "Tech Events Africa",
    "Tech Mentorship",
    "Tech Network Nigeria",
    "Tech Education Africa",
    "African Tech Ecosystem",
    "Tech Innovation Hub",
    "Tech Talent Africa",
    "African Tech Events",
    "Tech Community Lagos",
    "African Tech Network",
    "Tech Skills Development",
    "African Tech Mentorship",
    "Tech Career Africa",
    "African Tech Resources",
    "Tech Community Development",
    "African Tech Innovation"
  ],
  authors: [{ name: "Code Space", url: "https://www.codespaces.org" }],
  creator: "Code Space",
  publisher: "Code Space",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org",
    title: "Code Space - Africa's Premier Gen Z Tech Community & Innovation Hub",
    description:
      "Code Space is Africa's leading Gen Z tech community, empowering young tech talents through mentorship, events, and networking. Join our vibrant ecosystem of innovators, developers, and tech enthusiasts.",
    siteName: "Code Space",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org"}/images/icon.png`,
        width: 1200,
        height: 630,
        alt: "Code Space - Africa's Premier Gen Z Tech Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Space - Africa's Premier Gen Z Tech Community & Innovation Hub",
    description:
      "Code Space is Africa's leading Gen Z tech community, empowering young tech talents through mentorship, events, and networking. Join our vibrant ecosystem of innovators, developers, and tech enthusiasts.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org"}/images/icon.png`],
    creator: "@codespace",
    site: "@CodeSpaceHQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_CODE",
    other: {
      bing: "YOUR_BING_CODE"
    }
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Code Space",
    description:
      "Africa's leading Gen Z tech community, empowering young tech talents through mentorship, events, and networking.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://www.codespaces.org",
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
    foundingDate: "2021",
    founders: [
      {
        "@type": "Person",
        name: "Clinton Imaro",
      },
    ],
    sameAs: [
      "https://x.com/CodeSpaceHQ",
      "https://www.linkedin.com/company/codespacehq",
      "https://instagram.com/codesspace",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Nigeria",
      addressLocality: "Lagos",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@codespaces.org",
    },
    knowsAbout: [
      "African Tech Community",
      "Tech Innovation Hub",
      "Software Development",
      "Tech Events Africa",
      "Tech Education",
      "Gen Z Tech Community",
      "African Tech Ecosystem",
      "Tech Mentorship",
      "Tech Career Development",
      "African Tech Network",
      "Tech Skills Development",
      "Tech Innovation",
      "African Tech Resources",
      "Tech Community Building",
      "Digital Skills Training",
    ],
    areaServed: {
      "@type": "Continent",
      name: "Africa"
    },
    audience: {
      "@type": "Audience",
      audienceType: "Generation Z Tech Enthusiasts"
    },
    offers: {
      "@type": "Offer",
      category: [
        "Tech Community",
        "Tech Education",
        "Tech Events",
        "Mentorship"
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${graphikSans.className} ${duplicateSans.variable} antialiased lenis lenis-smooth`}>
        <SmoothScroll />
        <NavBar />
        <ScrollToTop />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
