export const profile = {
  name: "Lucas Hunter",
  tagline: "AI Engineer / Designer",
  role: "Frontend & Design Lead",
  company: "ProDex Labs",
  location: "NYC",
  bio: [
    "Frontend & design lead at ProDex Labs, an AI manufacturing optimization startup. Building tools that help factory operators make better decisions faster. Based in NYC, originally from the West Coast.",
    "USC Viterbi grad, CS degree. When I'm not pushing pixels or obsessing over interface details, I'm probably flying — got my private pilot license and working on instrument rating.",
    "I like building things that feel fast and look clean.",
  ],
  links: {
    email: "lucaspghunter@gmail.com",
    github: "https://github.com/lucashunter050",
    githubHandle: "lucashunter050",
    linkedin: "https://linkedin.com/in/lucas-hunter-336262221",
    domain: "lucas-hunter.com",
  },
  pilot: {
    certificate: "Private Pilot",
    workingOn: "Instrument rating",
    homeAirport: "KSMO",
    since: "2024",
    firstSoloImage: "/solo.jpeg",
  },
} as const;

export type Profile = typeof profile;
