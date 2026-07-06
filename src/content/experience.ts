export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  description: string;
  contributions: string[];
  tech: string[];
  logo?: string;
  /** Featured entries get full cards in Work; the rest render as a compact list */
  featured: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Frontend & Design Lead",
    company: "ProDex Labs",
    dates: "Jan 2026 – Present",
    description:
      "AI manufacturing optimization startup. Real-time visibility into complex production systems — interfaces that surface the right information at the right moment.",
    contributions: [],
    tech: ["React", "TanStack", "Zustand", "Tailwind"],
    featured: true,
  },
  {
    role: "Full Stack Engineer",
    company: "Property Matrix",
    dates: "Sep 2025 – Dec 2025",
    description:
      "Developer during a full platform redesign of an enterprise property management system.",
    contributions: [
      // TODO(lucas): confirm metrics — terminal resume says 5s→100ms for messaging
      "Virtualized and rewrote legacy Excel-style budgets page",
      "Reduced message load times from 2-3s to 50ms",
      "Cut common area maintenance calculations from 1hr+ to 3min",
    ],
    tech: ["React", "Relay", "GraphQL", "PostgreSQL"],
    logo: "/pm-logo.jpg",
    featured: true,
  },
  {
    role: "iOS Developer & Co-founder",
    company: "CurtainCall.co",
    // TODO(lucas): confirm end date — terminal resume says "Present"
    dates: "Jun 2025 – Dec 2025",
    description:
      "Native iOS app for actors and creative professionals to network. Sole iOS developer.",
    contributions: [
      "Built native iOS app from scratch with SwiftUI",
      "Real-time messaging and notifications",
      "Cast management, Kanban audition tracker, and job board",
    ],
    tech: ["Swift", "SwiftUI", "Firebase"],
    logo: "/CurtainCallLogoNoLettersNoAlpha-iOS-Default-1024x1024@1x.png",
    featured: true,
  },
  {
    role: "Undergraduate TA",
    company: "USC Computer Science",
    dates: "Aug 2023 – May 2025",
    description: "Weekly office hours supporting 200+ students.",
    contributions: ["Algorithms (CSCI-270), AI (CSCI-360), Internetworking (CSCI-353)"],
    tech: [],
    logo: "/usc-monogram-red.jpg",
    featured: false,
  },
  {
    role: "Lead Instructor",
    company: "iD Tech Camps UCLA",
    dates: "Jul 2024 – Aug 2024",
    description: "Taught Jetson Nano ML and C++ game development.",
    contributions: ["Guided all ML students to Nvidia external certification"],
    tech: [],
    logo: "/id-tech-logo.jpg",
    featured: false,
  },
  {
    role: "Launch Simulation Developer",
    company: "USC Rocket Propulsion Lab",
    dates: "Jan 2023 – May 2023",
    description: "Refactored legacy C++ Monte Carlo launch simulator.",
    contributions: ["Trajectory analysis for Fireball rocket's 50km launch"],
    tech: ["C++"],
    logo: "/usc-rpl.png",
    featured: false,
  },
  {
    role: "Software Developer",
    company: "Georgetown Disruptive Tech",
    dates: "Sep 2021 – May 2022",
    description: "Technical consulting for BCRemit's React Native app (10k+ users).",
    contributions: [],
    tech: ["React Native"],
    logo: "/gtown-disruptive-tech.svg",
    featured: false,
  },
];

export const education = {
  school: "University of Southern California",
  program: "B.S. Computer Science, Viterbi School of Engineering",
  dates: "Aug 2022 – May 2025",
  // TODO(lucas): confirm — page.tsx says "Dean's List, 3.9 GPA"; terminal resume says "Magna Cum Laude, GPA: 3.85"
  honors: "Magna Cum Laude, 3.85 GPA",
  highlights: [
    "TA for Algorithms, AI, and Networking",
    "Rocket Propulsion Lab — simulation team (record-setting launches)",
    "Led hackathon teams at Scope",
  ],
  logo: "/USC-Logo-Seal.png",
} as const;
