"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

function getZuluTime(): string {
  const now = new Date();
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");
  return `${hours}${minutes}${seconds}Z`;
}

function getLastSeenLocation(): string {
  const now = new Date();
  const nycHour = parseInt(
    now.toLocaleString("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false })
  );

  // 11pm (23) to 8am (7): fidi
  if (nycHour >= 23 || nycHour < 8) {
    return "FiDi";
  }
  // 8am to 9am: uptown 6
  if (nycHour >= 8 && nycHour < 9) {
    return "Uptown 6";
  }
  // 9am to 10pm (21): midtown east hq
  if (nycHour >= 9 && nycHour < 22) {
    return "Midtown East HQ";
  }
  // 10pm (22) to 11pm (23): downtown 6
  return "Downtown 6";
}

interface ExperienceDetail {
  description: string;
  techStack: string[];
  contributions: string[];
  link?: string;
  cta?: { text: string; href: string };
}

interface ExperienceRow {
  type: "header" | "row" | "standalone";
  text?: string;
  role?: string;
  company?: string;
  dates?: string;
  details?: ExperienceDetail;
}

const EXPERIENCE_DATA: ExperienceRow[] = [
  { type: "header", text: "Experience" },
  {
    type: "row",
    role: "Frontend",
    company: "ProDex Labs",
    dates: "Jan 2026 - Present",
    details: {
      description: "Frontend & design lead at an AI manufacturing optimization startup.",
      techStack: ["React", "TanStack", "Zustand", "Tailwind"],
      contributions: [],
    },
  },
  {
    type: "row",
    role: "Full Stack",
    company: "Property Matrix",
    dates: "Sep 2025 - Dec 2025",
    details: {
      description: "Developer during a full platform redesign of an enterprise property management system.",
      techStack: ["React", "Relay", "GraphQL", "PostgreSQL"],
      contributions: [
        "Virtualized and rewrote legacy Excel-style budgets page",
        "Reduced message load times from 2-3s to 50ms",
        "Cut common area maintenance calculations from 1hr+ to 3min",
      ],
    },
  },
  {
    type: "row",
    role: "iOS",
    company: "CurtainCall.co",
    dates: "Jun 2025 - Dec 2025",
    details: {
      description: "Built a native iOS app for actors and creative professionals to network.",
      techStack: ["Swift", "Firebase", "iOS"],
      contributions: [
        "Built native iOS app from scratch",
        "Implemented real-time messaging and notifications",
        "Designed talent discovery and networking features",
      ],
    },
  },
  {
    type: "row",
    role: "Education",
    company: "USC",
    dates: "Class of 2025",
    details: {
      description: "B.S. Computer Science, Viterbi School of Engineering.",
      techStack: ["Algorithms", "AI", "Networking", "Systems"],
      contributions: [
        "Dean's List, 3.9 GPA",
        "TA for Algorithms, AI, and Networking",
        "Rocket Propulsion Lab — simulation team (record-setting launches)",
        "Led hackathon teams at Scope",
      ],
    },
  },
  {
    type: "row",
    role: "Pilot",
    company: "KSMO",
    dates: "2024 - Present",
    details: {
      description: "Here's me after my first solo",
      techStack: [],
      contributions: [],
      link: "/solo.jpeg",
      cta: { text: "Launch flight simulator", href: "/flight-sim" },
    },
  },
];

// Konami code sequence
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const router = useRouter();

  const dividerLineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const konamiIndex = useRef(0);

  // Terminal activation via backtick or Konami code
  const openTerminal = useCallback(() => {
    router.push("/terminal");
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Backtick opens terminal
      if (e.key === "`") {
        e.preventDefault();
        openTerminal();
        return;
      }

      // Konami code detection
      if (e.code === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_CODE.length) {
          konamiIndex.current = 0;
          openTerminal();
        }
      } else {
        konamiIndex.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openTerminal]);

  // Time and location update
  useEffect(() => {
    setTime(getZuluTime());
    setLocation(getLastSeenLocation());
    const interval = setInterval(() => {
      setTime(getZuluTime());
      setLocation(getLastSeenLocation());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-driven expansion/collapse
  useEffect(() => {
    const checkLineIntersection = () => {
      if (!dividerLineRef.current) return;

      const lineRect = dividerLineRef.current.getBoundingClientRect();
      const lineY = lineRect.top + lineRect.height / 2;

      let newExpandedRow: number | null = null;

      // Check each row to see if the line is over it
      rowRefs.current.forEach((rowEl, index) => {
        if (!rowEl) return;

        const rowRect = rowEl.getBoundingClientRect();

        // If the line is within this row's bounds, expand it
        if (lineY >= rowRect.top && lineY <= rowRect.bottom) {
          newExpandedRow = index;
        }
      });

      setExpandedRow(newExpandedRow);
    };

    window.addEventListener("scroll", checkLineIntersection, { passive: true });
    checkLineIntersection(); // Check on mount

    return () => window.removeEventListener("scroll", checkLineIntersection);
  }, []);

  const setRowRef = (index: number) => (el: HTMLDivElement | null) => {
    rowRefs.current[index] = el;
  };

  return (
    <main className="bg-background font-sans overflow-x-hidden">
      {/* Spacer to push content down */}
      <div className="h-[10vh]" />

      {/* Hero Section */}
      <div className="min-h-[40vh] flex items-center">
        <div className="px-8 max-w-2xl mx-auto w-full">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-wider-custom text-text uppercase">
            Lucas Hunter
          </h1>
          <p className="mt-2 text-base md:text-lg tracking-wider-custom text-text uppercase">
            Software Engineer @ ProDex Labs
          </p>
          <div className="mt-6 flex items-center gap-8 text-sm tracking-wider-custom text-text uppercase">
            <span>Last Seen: {location}</span>
            <span>{'// NYC'}</span>
          </div>
          <p
            onClick={openTerminal}
            className="mt-1 text-sm tracking-wider-custom text-text uppercase cursor-pointer hover:text-highlight transition-colors"
          >
            {time}
          </p>
        </div>
      </div>

      {/* Fixed Divider Line - stays in viewport as user scrolls */}
      <div
        ref={dividerLineRef}
        className="fixed left-0 w-screen h-0.5 bg-highlight z-50"
        style={{ bottom: "30%" }}
      />

      {/* Spacer between line and experience */}
      <div className="h-[10vh]" />

      {/* Experience Section */}
      <div className="px-8 max-w-2xl mx-auto pb-32 pt-16">
        <div className="font-sans text-sm relative">
          {/* Header */}
          <div className="text-text uppercase tracking-wider mb-4">
            Experience
          </div>

          {/* Experience Rows */}
          <div>
            {EXPERIENCE_DATA.map((item, index) => {
              if (item.type !== "row") return null;

              const rowIndex = index - 1; // 0-indexed for rows only
              const isExpanded = expandedRow === rowIndex;

              return (
                <div
                  key={index}
                  ref={setRowRef(rowIndex)}
                  className="relative"
                >
                  {/* Header Row */}
                  <div className="flex pl-4 py-3 group cursor-pointer justify-between">
                    <div className="flex">
                      <span className="uppercase w-28 text-text font-medium tracking-wider">
                        {item.role}
                      </span>
                      <span className="text-text font-medium group-hover:translate-x-1 transition-transform duration-200">
                        @ {item.company}
                      </span>
                    </div>
                    {item.dates && (
                      <span className="text-[#888] text-xs tracking-wider">
                        {item.dates}
                      </span>
                    )}
                  </div>

                  {/* Expanded Details */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-150 ease-out
                      ${isExpanded ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"}
                    `}
                  >
                    {item.details && (
                      <div className="pl-8 pt-2">
                        {/* Cluster 1: Description - light grey, normal size */}
                        {item.details.link ? (
                          <a
                            href={item.details.link}
                            target="_blank"
                            className="text-[#999] text-sm leading-relaxed hover:text-text transition-colors"
                          >
                            {item.details.description}
                          </a>
                        ) : (
                          <div className="text-[#999] text-sm leading-relaxed">
                            {item.details.description}
                          </div>
                        )}

                        {/* Tech stack - white, smaller */}
                        {item.details.techStack.length > 0 && (
                          <>
                            <div className="h-3" />
                            <div className="text-text text-xs">
                              {item.details.techStack.join(" / ")}
                            </div>
                          </>
                        )}

                        {/* Achievements - dimmer, smaller, tight */}
                        {item.details.contributions.length > 0 && (
                          <>
                            <div className="h-3" />
                            <div className="text-[#666] text-xs leading-tight space-y-0.5">
                              {item.details.contributions.map((contribution, cIndex) => (
                                <div key={cIndex}>{contribution}</div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Optional CTA */}
                        {item.details.cta && (
                          <a
                            href={item.details.cta.href}
                            className="block text-[#666] text-xs hover:text-text transition-colors"
                          >
                            {item.details.cta.text}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Contact Section */}
        <div className="font-sans text-sm relative mt-16">
          {/* Header */}
          <div className="text-text uppercase tracking-wider mb-4">
            Contact
          </div>

          {/* Contact Links */}
          <div className="pl-4 space-y-2">
            <a
              href="mailto:lucaspghunter@gmail.com"
              className="block text-[#777] hover:text-text transition-colors"
            >
              lucaspghunter@gmail.com
            </a>
            <a
              href="https://github.com/lucashunter050"
              target="_blank"
              className="block text-[#777] hover:text-text transition-colors"
            >
              github.com/lucashunter050
            </a>
            <a
              href="https://linkedin.com/in/lucas-hunter-336262221"
              target="_blank"
              className="block text-[#777] hover:text-text transition-colors"
            >
              linkedin.com/in/lucas-hunter-336262221
            </a>
          </div>
        </div>

        {/* EOF */}
        <div
          onClick={openTerminal}
          className="mt-16 text-[#444] text-xs tracking-wider cursor-pointer hover:text-highlight transition-colors"
        >
          EOF
        </div>
      </div>
    </main>
  );
}
