import {
  ChartAreaIcon,
  CrownIcon,
  GlobeIcon,
  HandshakeIcon,
  MonitorPlayIcon,
  PuzzleIcon,
  TrophyIcon,
  UsersRoundIcon
} from "lucide-react";

export const values = [
  {
    title: "Impact",
    description:
      "Driving change through technology by empowering Gen Z to build innovative solutions for global challenges.",
    icon: GlobeIcon
  },
  {
    title: "Growth",
    description:
      "Fostering continuous learning and development for our members, enabling them to thrive in the evolving tech landscape.",
    icon: ChartAreaIcon
  },
  {
    title: "Inclusion",
    description:
      "Creating a diverse and welcoming community where everyone, regardless of background, has equal access to opportunities.",
    icon: HandshakeIcon
  },
  {
    title: "Leadership",
    description:
      "Equipping young people with the skills and mentorship needed to become tomorrow's tech leaders and innovators.",
    icon: CrownIcon
  },
  {
    title: "Collaboration",
    description:
      "Encouraging teamwork and knowledge-sharing to create impactful projects and build meaningful connections in the tech space.",
    icon: UsersRoundIcon
  }
];

export type ValueType = (typeof values)[number];

export const what_we_do = [
  {
    title: "Hackathons",
    description:
      "When passionate minds come together, they build amazing products for real people with real problems. Our hackathons aren’t just for developers. They’re for anyone with tech skills ready to turn ideas into products that make a difference.",
    date: "2024",

    icon: TrophyIcon,
    stats: [
      {
        name: "Participants",
        value: 200,
        suffix: "+"
      },

      {
        name: "Judges",
        value: 30,
        suffix: "+"
      },

      {
        name: "Winners",
        value: 5,
        suffix: "+"
      }
    ]
  },
  {
    title: "Challenges",
    description:
      "Our challenges are fun, skill-building events where Code Spacers take on creative, problem-solving, and time-bound tasks.",
    date: "2024",

    icon: PuzzleIcon,
    stats: [
      {
        name: "Participants",
        value: 200,
        suffix: "+"
      },

      {
        name: "Judges",
        value: 30,
        suffix: "+"
      },

      {
        name: "Winners",
        value: 5,
        suffix: "+"
      }
    ]
  },
  {
    title: "Virtual Events",
    description:
      "We host young African tech talents doing iconic work during our virtual events, and every Space or webinar inspires, educates, and sparks meaningful discussions among community members.",
    date: "2024",

    icon: MonitorPlayIcon,
    stats: [
      {
        name: "Participants",
        value: 200,
        suffix: "+"
      },

      {
        name: "Judges",
        value: 30,
        suffix: "+"
      },

      {
        name: "Winners",
        value: 5,
        suffix: "+"
      }
    ]
  }
];

export type WhatWeDo = (typeof what_we_do)[number];

export const stats = [
  {
    name: "Locations",
    value: 15,
    suffix: "+",
    description:
      "Our community spans across more than 15 cities worldwide, connecting Gen Z technologists from diverse backgrounds."
  },
  {
    name: "Members",
    value: 1000,
    suffix: "+",
    description:
      "With over 1,000 active members, Code Space is growing as a global hub for young innovators and tech enthusiasts."
  },
  {
    name: "Challenge",
    value: 1,
    suffix: "",
    description:
      "We’ve successfully completed our first major challenge, pushing participants to innovate and build impactful tech solutions."
  },
  {
    name: "Hackathons",
    value: 2,
    suffix: "",
    description:
      "We've hosted two dynamic hackathons where participants collaborated to solve real-world problems through technology."
  },
  {
    name: "Physical Events",
    value: 2,
    suffix: "",
    description:
      "We've hosted two dynamic hackathons where participants collaborated to solve real-world problems through technology."
  },
  {
    name: "Virtual Events",
    value: 20,
    suffix: "+",
    description:
      "Over 20 virtual events, including workshops, panels, and coding challenges, have kept our community engaged and learning year-round."
  }
];

export type StatsType = (typeof stats)[number];

export const brands = [
  "couchbase",
  "technext",
  "theguardian",
  "paystack",
  "aws",
  "genztechies"
];

export const links = [
  { name: "About us", href: "/about-us" },
  { name: "Donate", href: "/donate" },
  { name: "Events", href: "/events" },
  { name: "Shop", href: "/shop" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact us", href: "/contact" }
];

export const other_links = [
  { name: "Brand Guidelines", href: "/brand-guidelines" },
  { name: "Ambassador Program", href: "/ambassador-program" },
  { name: "Press Feature", href: "/press-feature" }
];

export const socials = [
  {
    name: "twitter",
    url: "https://twitter.com/codespaceafrica"
  },
  {
    name: "instagram",
    url: "https://instagram.com/codespaceafrica"
  },
  {
    name: "linkedin",
    url: "https://linkedin.com/company/codespaceafrica"
  },
  {
    name: "github",
    url: "https://github.com/codespaceafrica"
  },

  {
    name: "facebook",
    url: "https://facebook.com/codespaceafrica"
  }
];
