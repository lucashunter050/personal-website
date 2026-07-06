export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Go", "Swift", "C++", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind", "Motion", "Relay"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "Rails"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Kubernetes", "AWS", "Figma", "Claude Code"],
  },
  {
    label: "Currently learning",
    items: ["Rust", "WebGL", "Three.js"],
  },
];
