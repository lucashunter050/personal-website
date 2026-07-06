import {
  Activity,
  Bot,
  Boxes,
  Braces,
  FileCode2,
  Gauge,
  PenTool,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** The 2x4 "Systems" grid — developer capability cards from the dashboard mockup. */
export const capabilities: Capability[] = [
  {
    icon: Boxes,
    title: "Full-stack systems",
    description:
      "End-to-end systems from infrastructure to interface. Scalable. Observable. Production-ready.",
  },
  {
    icon: Bot,
    title: "Agent interfaces",
    description:
      "Designing control surfaces for AI agents and human operators to collaborate with confidence.",
  },
  {
    icon: Activity,
    title: "Realtime UX",
    description:
      "Low-latency experiences with live data, streaming updates, and resilient state management.",
  },
  {
    icon: Gauge,
    title: "Simulation tools",
    description:
      "Custom simulators and visualizations for testing behavior, stress, and edge cases.",
  },
  {
    icon: Braces,
    title: "TypeScript",
    description:
      "Type-safe systems with clean architecture and developer experience in mind.",
  },
  {
    icon: FileCode2,
    title: "Python",
    description:
      "Backend, data pipelines, and ML tooling built for clarity and performance.",
  },
  {
    icon: Workflow,
    title: "LLM workflows",
    description:
      "Prompt orchestration, tool use, memory, and evaluation for reliable automation.",
  },
  {
    icon: PenTool,
    title: "Design engineering",
    description:
      "Bridging design and code with systems thinking, prototyping, and pixel-level care.",
  },
];
