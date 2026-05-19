import type { Metadata } from "next";
import localFont from "next/font/local";
import "../(main)/globals.css";
import SmoothScroll from "@/components/smoothscroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    variable: "--font-graphik",
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
        "Code Space is Africa's leading Gen Z tech community, empowering young tech talents through mentorship, events, and networking.",
};

export default function StandaloneLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </head>
            <body className={`${graphikSans.className} ${duplicateSans.variable} antialiased lenis lenis-smooth`}>
                <SmoothScroll />
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
