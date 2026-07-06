export interface Project {
  title: string;
  dates?: string;
  description: string;
  highlights: string[];
  tech: string[];
  status?: "offline" | "live";
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Flight Simulator",
    description:
      "Real-time WebGL flight over an endless cloudscape, booted straight from this site's cockpit.",
    highlights: [
      "Honest flight model: bank-driven coordinated turns, energy trades, stall behavior",
      "DOM HUD driven from the render loop via zustand",
    ],
    tech: ["Three.js", "React Three Fiber", "zustand"],
    status: "live",
    link: "/flight-sim",
  },
  {
    title: "OpenHome.xyz Capstone",
    dates: "Jan 2025 – May 2025",
    description:
      "Voice-activated smart speaker agents built with Python, LLMs, and IoT devices over MQTT.",
    highlights: ["Two implementations featured on OpenHome's official developer blog"],
    tech: ["Python", "LLMs", "MQTT", "IoT"],
  },
  {
    title: "Distributed Key-Value Store",
    description:
      "Google Spanner-inspired distributed database with Paxos consensus implemented in Go.",
    highlights: ["100% consistency under any number of message or node failures"],
    tech: ["Go", "Paxos"],
  },
];
