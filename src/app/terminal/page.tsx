"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// File system structure
interface FSNode {
  type: "file" | "directory";
  content?: string;
  children?: Record<string, FSNode>;
}

const FILE_SYSTEM: Record<string, FSNode> = {
  "~": {
    type: "directory",
    children: {
      "about.txt": {
        type: "file",
        content: `Hey, I'm Lucas Hunter.

Frontend & design lead at ProDex Labs, an AI manufacturing optimization
startup. Building tools that help factory operators make better decisions
faster. Based in NYC, originally from the West Coast.

USC Viterbi grad, CS degree. When I'm not pushing pixels or obsessing over
interface details, I'm probably flying — got my private pilot license and
working on instrument rating.

I like building things that feel fast and look clean.`,
      },
      "resume.txt": {
        type: "file",
        content: `LUCAS HUNTER
lucas-hunter.com | lucaspghunter@gmail.com | linkedin.com/in/lucas-hunter-336262221

──────────────────────────────────────────────────────────────
TECHNICAL SKILLS
──────────────────────────────────────────────────────────────

Languages:    Swift, C++, C, Go, Python, Java, JavaScript/TypeScript, Ruby, OCaml, SQL
Frameworks:   SwiftUI, Rails, GraphQL, React, React Native, Next.js, Relay
Tools:        Git, Firebase, Xcode, Valgrind, AWS, Selenium, Docker, Kubernetes, Claude Code

──────────────────────────────────────────────────────────────
EXPERIENCE
──────────────────────────────────────────────────────────────

Full Stack Software Engineer @ Property Matrix          Sep 2025 - Present
  • Reduced messaging system load times from 5s to 100ms
  • Optimized common area maintenance calculations from 1hr+ to under 3min
  • Built full-stack features across TypeScript/Relay/React, Rails, SQL, GraphQL
  • Enhanced reliability with Docker/Kubernetes distributed test cluster

iOS Developer @ CurtainCall.co                          Jun 2025 - Present
  • Sole iOS developer and co-founder
  • Redesigned beta app with SwiftUI mobile and Next.js web architecture
  • Built cast management system, Kanban audition tracker, and job board

Undergraduate TA @ USC Computer Science                 Aug 2023 - May 2025
  • Led weekly office hours supporting 200+ students
  • Courses: Algorithms (CSCI-270), AI (CSCI-360), Internetworking (CSCI-353)

Lead Instructor @ iD Tech Camps UCLA                    Jul 2024 - Aug 2024
  • Taught Jetson Nano ML and C++ game development
  • Guided all ML students to Nvidia external certification

Launch Simulation Developer @ USC Rocket Propulsion Lab Jan 2023 - May 2023
  • Refactored legacy C++ Monte Carlo launch simulator
  • Supported trajectory analysis for Fireball rocket's 50km launch

Software Developer @ Georgetown Disruptive Tech         Sep 2021 - May 2022
  • Technical consulting for BCRemit's React Native app (10k+ users)

──────────────────────────────────────────────────────────────
PROJECTS
──────────────────────────────────────────────────────────────

OpenHome.xyz Capstone                                   Jan 2025 - May 2025
  • Voice-activated smart speaker agents with Python, LLMs, IoT over MQTT
  • Two implementations featured on OpenHome's official developer blog

Google Spanner Based Distributed Key Value Store
  • Implemented Paxos in Go for fault-tolerant distributed database
  • Ensured 100% consistency with any number of message/node failures

──────────────────────────────────────────────────────────────
EDUCATION
──────────────────────────────────────────────────────────────

University of Southern California                       Aug 2022 - May 2025
B.S. Computer Science, Magna Cum Laude, GPA: 3.85`,
      },
      "contact.txt": {
        type: "file",
        content: `EMAIL     lucaspghunter@gmail.com
GITHUB    github.com/lucashunter050
LINKEDIN  linkedin.com/in/lucas-hunter-336262221`,
      },
      "skills.txt": {
        type: "file",
        content: `LANGUAGES
  TypeScript, JavaScript, Python, Go, SQL

FRONTEND
  React, Next.js, TailwindCSS, Framer Motion

BACKEND
  Node.js, Express, PostgreSQL, Redis, GraphQL

TOOLS
  Git, Docker, AWS, Vercel, Figma

CURRENTLY LEARNING
  Rust, WebGL, Three.js`,
      },
      projects: {
        type: "directory",
        children: {
          "prodex-labs.txt": {
            type: "file",
            content: `PRODEX LABS
Role: Frontend & Design Lead

ProDex is an AI manufacturing optimization startup. We help factory
operators make better decisions faster through real-time visibility
into complex production systems.

WHAT I BUILT
  • Real-time production monitoring dashboards
  • Component library for complex data visualization
  • WebSocket architecture for live factory data streams
  • Interfaces that feel immediate and intuitive

TECH STACK
  React, TanStack, Zustand, Tailwind

WHY IT MATTERS
  In manufacturing, clarity saves time and money. I design interfaces
  that surface the right information at the right moment.`,
          },
          "property-matrix.txt": {
            type: "file",
            content: `PROPERTY MATRIX
Role: Full Stack Engineer

Developer during a full platform redesign. Implemented UI components
and screens across the new React/Relay frontend, learning how
large-scale production codebases actually ship.

WHAT I BUILT
  • Virtualized and rewrote legacy Excel-style budgets page
  • Reduced message load times from 2-3s to 50ms
  • Cut common area maintenance calculations from 1hr+ to 3min

TECH STACK
  React, Relay, GraphQL, PostgreSQL

LESSONS LEARNED
  Performance matters at scale. Small optimizations compound into
  massive improvements when thousands of users hit the same code.`,
          },
          "flight-sim.txt": {
            type: "file",
            content: `FLIGHT SIMULATOR EASTER EGG
You found it.

This is a browser-based flight simulator hidden in my portfolio.
You're literally reading the source code of the thing you just discovered.

HOW TO PLAY
  Type 'flight' in the terminal to launch.
  Arrow keys or WASD to control pitch and roll.
  ESC to exit back to terminal.

WHY I BUILT IT
  Because I'm a pilot and I like easter eggs.
  Also because "just another portfolio site" is boring.

TECH
  Canvas API, requestAnimationFrame, basic 3D math
  No libraries. Pure JavaScript.

If you're reading this, you're my kind of person.`,
          },
        },
      },
      ".secret": {
        type: "directory",
        children: {
          "message.txt": {
            type: "file",
            content: `
 ██████╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗  █████╗ ████████╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝ ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
██║     ██║   ██║██╔██╗ ██║██║  ███╗██████╔╝███████║   ██║   ███████╗
██║     ██║   ██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║   ██║   ╚════██║
╚██████╗╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║██║  ██║   ██║   ███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

You found the secret.

If you're a recruiter: I'm not actively looking, but I'm always open
to interesting opportunities. Reach out: lucaspghunter@gmail.com

If you're a developer: Nice work exploring. Most people never look
past the surface. That curiosity is exactly what makes great engineers.

If you're just having fun: Same. That's why I built this.

- Lucas

P.S. Try 'flight' for another surprise.`,
          },
        },
      },
    },
  },
};

// Whoami responses
const WHOAMI_RESPONSES = [
  "visitor",
  "a curious one",
  "fellow developer",
  "potential collaborator",
  "someone with good taste",
  "an explorer",
  "a person of culture",
];

// Special command responses
const SPECIAL_COMMANDS: Record<string, string> = {
  alias: "you wish. this terminal is read-only.",
  kubernetes: "this site is a single HTML page. I think we're good.",
  k8s: "this site is a single HTML page. I think we're good.",
  docker: "you want to containerize a portfolio? just open the HTML file.",
  sudo: "nice try. you don't have root access here.",
  vim: "there is no escape. (just kidding, try 'cat' instead)",
  nano: "this isn't that kind of terminal. try 'cat' to read files.",
  rm: "nothing to delete here. this is a read-only file system.",
  "rm -rf /": "absolutely not.",
  "rm -rf": "absolutely not.",
  git: "this portfolio is already committed. check github.com/lucashunter050",
  npm: "node_modules would be heavier than this entire site",
  "npm install": "node_modules would be heavier than this entire site",
  yarn: "node_modules would be heavier than this entire site",
  pnpm: "ah, a person of culture. still no package manager here though.",
  ssh: "you're already connected. welcome.",
  ping: "pong",
  curl: "try 'cat' instead — all the good stuff is local.",
  wget: "everything you need is already here. try 'ls'",
  man: "no manual needed. type 'help' for commands.",
  touch: "read-only file system. nice try though.",
  mkdir: "you can look, but you can't touch.",
  find: "use 'ls' and 'cd' to explore.",
  tree: "use 'ls' to see directory contents.",
  neofetch: `
\x1b[32m ██╗     ██╗  ██╗\x1b[0m    \x1b[37mvisitor\x1b[0m@\x1b[37mlucas-hunter.com\x1b[0m
\x1b[32m ██║     ██║  ██║\x1b[0m    ──────────────────────────
\x1b[32m ██║     ███████║\x1b[0m    \x1b[37mOS:\x1b[0m LucasOS v1.0
\x1b[32m ██║     ██╔══██║\x1b[0m    \x1b[37mHost:\x1b[0m lucas-hunter.com
\x1b[32m ███████╗██║  ██║\x1b[0m    \x1b[37mFramework:\x1b[0m Next.js 15 + React 19
\x1b[32m ╚══════╝╚═╝  ╚═╝\x1b[0m    \x1b[37mStyling:\x1b[0m TailwindCSS
                     \x1b[37mDeploy:\x1b[0m Cloudflare Pages
                     \x1b[37mLines of Code:\x1b[0m ~2,400
                     \x1b[37mUptime:\x1b[0m 100% (always)
                     \x1b[37mTerminal:\x1b[0m v1.0
                     \x1b[37mTheme:\x1b[0m Dark + Lime`,
};

interface TerminalLine {
  type: "input" | "output" | "output-dim" | "welcome";
  content: string;
  prompt?: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "welcome", content: "Lucas Hunter — Terminal v1.0" },
    { type: "output", content: "Type 'help' for available commands.\n" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [whoamiCount, setWhoamiCount] = useState(0);
  const [inputLocked, setInputLocked] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const getPrompt = useCallback(() => {
    return `visitor@lucas-hunter.com:${currentDir}$`;
  }, [currentDir]);

  // Get node at path
  const getNode = useCallback((path: string): FSNode | null => {
    const parts = path.split("/").filter(Boolean);
    let current: FSNode = FILE_SYSTEM["~"];

    if (path === "~" || path === "") return current;

    for (const part of parts) {
      if (part === "~") continue;
      if (current.type !== "directory" || !current.children) return null;
      if (!current.children[part]) return null;
      current = current.children[part];
    }
    return current;
  }, []);

  // Resolve path (handles .., ~, relative paths)
  const resolvePath = useCallback((path: string): string => {
    if (path === "~" || path === "") return "~";
    if (path.startsWith("~/")) {
      return "~/" + path.slice(2);
    }
    if (path.startsWith("/")) {
      return "~" + path;
    }

    let current = currentDir;
    const parts = path.split("/");

    for (const part of parts) {
      if (part === "..") {
        if (current !== "~") {
          const idx = current.lastIndexOf("/");
          current = idx > 0 ? current.slice(0, idx) : "~";
        }
      } else if (part === "." || part === "") {
        continue;
      } else {
        current = current === "~" ? `~/${part}` : `${current}/${part}`;
      }
    }
    return current;
  }, [currentDir]);

  // Get autocomplete suggestions
  const getAutocompleteSuggestions = useCallback((partial: string): string[] => {
    const node = getNode(currentDir);
    if (!node || node.type !== "directory" || !node.children) return [];

    const entries = Object.keys(node.children);
    if (!partial) return entries;

    return entries.filter(e => e.startsWith(partial));
  }, [currentDir, getNode]);

  // Run a single command and return output (for piping support)
  type CommandResult = { output: string; error?: boolean; special?: "clear" | "exit" | "flight" | "metar" | "claude" };

  const runSingleCommand = useCallback((cmdString: string, stdin?: string): CommandResult => {
    const trimmed = cmdString.trim();
    if (!trimmed) return { output: "" };

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Check for special commands first
    if (SPECIAL_COMMANDS[trimmed.toLowerCase()]) {
      return { output: SPECIAL_COMMANDS[trimmed.toLowerCase()] };
    }
    if (SPECIAL_COMMANDS[cmd]) {
      return { output: SPECIAL_COMMANDS[cmd] };
    }

    switch (cmd) {
      case "help":
        return {
          output: `\x1b[37mAvailable commands:\x1b[0m
  \x1b[37mls\x1b[0m          List directory contents
  \x1b[37mcd\x1b[0m          Change directory
  \x1b[37mcat\x1b[0m         Read file contents
  \x1b[37mgrep\x1b[0m        Filter text by pattern (supports piping)
  \x1b[37mpwd\x1b[0m         Print working directory
  \x1b[37mclear\x1b[0m       Clear terminal
  \x1b[37mwhoami\x1b[0m      Display user info
  \x1b[37mhistory\x1b[0m     Show command history
  \x1b[37mflight\x1b[0m      Launch flight simulator
  \x1b[37mexit\x1b[0m        Close terminal

  \x1b[37mTab\x1b[0m         Autocomplete file/directory names
  \x1b[37m|\x1b[0m           Pipe output (e.g., cat file.txt | grep search)`,
        };

      case "ls": {
        const showHidden = args.includes("-a");
        const pathArg = args.find(a => !a.startsWith("-")) || "";
        const targetPath = pathArg ? resolvePath(pathArg) : currentDir;
        const node = getNode(targetPath);

        if (!node) {
          return { output: `ls: cannot access '${pathArg}': No such file or directory`, error: true };
        }
        if (node.type !== "directory" || !node.children) {
          return { output: pathArg || currentDir.split("/").pop() || "~" };
        }

        const entries = Object.entries(node.children)
          .filter(([name]) => showHidden || !name.startsWith("."))
          .map(([name, child]) => ({
            name,
            isDir: child.type === "directory",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        const formatted = entries
          .map(e => e.isDir ? `\x1b[32m${e.name}/\x1b[0m` : e.name)
          .join("  ");
        return { output: formatted || "(empty)" };
      }

      case "cd": {
        if (!args[0] || args[0] === "~") {
          setCurrentDir("~");
          return { output: "" };
        }
        const targetPath = resolvePath(args[0]);
        const node = getNode(targetPath);

        if (!node) {
          return { output: `cd: no such directory: ${args[0]}`, error: true };
        }
        if (node.type !== "directory") {
          return { output: `cd: not a directory: ${args[0]}`, error: true };
        }
        setCurrentDir(targetPath);
        return { output: "" };
      }

      case "cat": {
        if (!args[0]) {
          // If no args but we have stdin, pass it through
          if (stdin) return { output: stdin };
          return { output: "cat: missing file operand", error: true };
        }
        const targetPath = resolvePath(args[0]);
        const node = getNode(targetPath);

        if (!node) {
          return { output: `cat: no such file: ${args[0]}`, error: true };
        }
        if (node.type === "directory") {
          return { output: `cat: ${args[0]}: Is a directory`, error: true };
        }
        return { output: node.content || "" };
      }

      case "grep": {
        if (!args[0]) {
          return { output: "grep: missing pattern", error: true };
        }
        const pattern = args[0];
        const input = stdin || "";

        if (!input) {
          return { output: "grep: no input (try piping from cat)", error: true };
        }

        try {
          const regex = new RegExp(pattern, "i");
          const lines = input.split("\n").filter(line => regex.test(line));
          return { output: lines.join("\n") || "(no matches)" };
        } catch {
          // If invalid regex, do simple string match
          const lines = input.split("\n").filter(line =>
            line.toLowerCase().includes(pattern.toLowerCase())
          );
          return { output: lines.join("\n") || "(no matches)" };
        }
      }

      case "pwd":
        return { output: currentDir };

      case "clear":
        return { output: "", special: "clear" };

      case "whoami": {
        const response = WHOAMI_RESPONSES[whoamiCount % WHOAMI_RESPONSES.length];
        setWhoamiCount(c => c + 1);
        return { output: response };
      }

      case "history":
        if (history.length === 0) {
          return { output: "(no history)" };
        }
        return {
          output: history
            .map((cmd, i) => `  ${(i + 1).toString().padStart(3)}  ${cmd}`)
            .join("\n"),
        };

      case "echo": {
        const echoArg = args.join(" ");
        if (echoArg.toLowerCase() === "hello") {
          return { output: echoArg + "\n\x1b[90m(hello to you too)\x1b[0m" };
        }
        return { output: echoArg };
      }

      case "top":
        return {
          output: `\x1b[37mPID   USER      CPU%  MEM%  TIME      COMMAND\x1b[0m
────────────────────────────────────────────────────────
1     lucas     0.2   1.2   00:00:01  next-server
12    lucas     0.1   0.8   00:00:00  react-dom
24    lucas     0.0   0.3   00:00:00  tailwind-jit
42    visitor   0.1   0.1   00:00:00  terminal-session
88    lucas     0.0   0.2   00:00:00  scroll-listener
99    lucas     0.0   0.1   00:00:00  zulu-clock
128   lucas     0.0   0.0   00:00:00  cursor-blink
256   lucas     0.3   0.4   00:00:00  vibe-check
512   lucas     0.0   0.1   00:00:00  easter-egg-loader
1337  lucas     0.0   0.0   00:00:00  awaiting-flight-sim`,
        };

      case "weather":
      case "metar":
        return { output: "", special: "metar" };

      case "flight":
        return { output: "\x1b[37mINITIALIZING FLIGHT SIMULATOR...\x1b[0m\nLoading terrain data...\nCalibrating instruments...\n\nRedirecting to /flight-sim...", special: "flight" };

      case "exit":
        return { output: "Goodbye.", special: "exit" };

      case "claude":
        return { output: "", special: "claude" };

      default:
        return { output: `command not found: ${cmd}`, error: true };
    }
  }, [currentDir, getNode, history, resolvePath, whoamiCount]);

  // Execute command (with pipe support)
  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      { type: "input", content: trimmed, prompt: getPrompt() },
    ];

    // Parse pipes
    const pipeSegments = trimmed.split("|").map(s => s.trim());

    let pipeOutput: string | undefined;
    let hasError = false;

    for (const segment of pipeSegments) {
      if (hasError) break;

      const result = runSingleCommand(segment, pipeOutput);

      // Handle special commands
      if (result.special === "clear") {
        setLines([]);
        return;
      }

      if (result.special === "metar") {
        setLines(prev => [...prev,
          { type: "input", content: trimmed, prompt: getPrompt() },
          { type: "output-dim", content: "Fetching METAR for KJFK..." }
        ]);
        setHistory(prev => [...prev, trimmed]);

        fetch("https://aviationweather.gov/api/data/metar?ids=KJFK&format=raw")
          .then(res => res.text())
          .then(data => {
            const metar = data.trim() || "No METAR data available";
            setLines(prev => [...prev,
              { type: "output", content: `\x1b[37mKJFK METAR:\x1b[0m\n${metar}` }
            ]);
          })
          .catch(() => {
            setLines(prev => [...prev,
              { type: "output", content: "Failed to fetch METAR data" }
            ]);
          });
        return;
      }

      if (result.special === "flight") {
        newLines.push({ type: "output", content: result.output });
        setLines(prev => [...prev, ...newLines]);
        setHistory(prev => [...prev, trimmed]);
        setTimeout(() => {
          window.location.href = "/flight-sim";
        }, 1500);
        return;
      }

      if (result.special === "exit") {
        newLines.push({ type: "output", content: result.output });
        setLines(prev => [...prev, ...newLines]);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
        return;
      }

      if (result.special === "claude") {
        setInputLocked(true);
        setLines(prev => [...prev,
          { type: "input", content: trimmed, prompt: getPrompt() },
        ]);
        setHistory(prev => [...prev, trimmed]);

        // Clear screen after brief pause
        setTimeout(() => {
          setLines([
            { type: "output-dim", content: "Connecting to Claude..." },
          ]);
        }, 300);

        // Show Claude interface
        setTimeout(() => {
          setLines([
            { type: "output", content: `\x1b[37m╭─── Claude Code ──────────────────────────────────────────────────────────────╮
│                                                                              │
│                          Welcome, visitor.                                   │
│                                                                              │\x1b[0m
\x1b[37m│\x1b[0m                            \x1b[32m▐▛███▜▌\x1b[0m                                           \x1b[37m│\x1b[0m
\x1b[37m│\x1b[0m                           \x1b[32m▝▜█████▛▘\x1b[0m                                          \x1b[37m│\x1b[0m
\x1b[37m│\x1b[0m                             \x1b[32m▘▘ ▝▝\x1b[0m                                            \x1b[37m│\x1b[0m
\x1b[37m│                                                                              │
│                      guest@lucas-hunter.com                                  │
│                   ~/terminal (read-only session)                             │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯\x1b[0m` }
          ]);
        }, 800);

        // Show message
        setTimeout(() => {
          setLines(prev => [...prev,
            { type: "output-dim", content: "\nI didn't build this site. But I did help.\n" }
          ]);
        }, 2000);

        // Connection closed + restore terminal
        setTimeout(() => {
          setLines(prev => [...prev,
            { type: "output-dim", content: "> connection closed.\n" }
          ]);
        }, 3000);

        setTimeout(() => {
          setLines([
            { type: "welcome", content: "Lucas Hunter — Terminal v1.0" },
            { type: "output", content: "Type 'help' for available commands.\n" },
            { type: "input", content: "claude", prompt: getPrompt() },
            { type: "output-dim", content: "(session ended)" },
          ]);
          setInputLocked(false);
        }, 4000);

        return;
      }

      if (result.error) {
        hasError = true;
      }

      pipeOutput = result.output;
    }

    // Add final output
    if (pipeOutput) {
      newLines.push({ type: "output", content: pipeOutput });
    }

    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
  }, [getPrompt, runSingleCommand]);

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const words = currentInput.split(/\s+/);
      const lastWord = words[words.length - 1];
      const suggestions = getAutocompleteSuggestions(lastWord);

      if (suggestions.length === 1) {
        words[words.length - 1] = suggestions[0];
        const node = getNode(resolvePath(suggestions[0]));
        if (node?.type === "directory") {
          words[words.length - 1] += "/";
        }
        setCurrentInput(words.join(" "));
      } else if (suggestions.length > 1) {
        setLines(prev => [
          ...prev,
          { type: "input", content: currentInput, prompt: getPrompt() },
          { type: "output", content: suggestions.join("  ") },
        ]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }, [currentInput, executeCommand, getAutocompleteSuggestions, getNode, getPrompt, history, historyIndex, resolvePath]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Render line with ANSI color codes
  // 32 = lime green (highlight), 37 = white, 90 = dim grey, 0 = reset to default
  const renderContent = (content: string) => {
    const parts = content.split(/\x1b\[(\d+)m/);
    const result: React.ReactNode[] = [];
    let colorClass = "";

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        const code = parts[i];
        if (code === "32") colorClass = "text-highlight";
        else if (code === "37") colorClass = "text-white";
        else if (code === "90") colorClass = "text-gray-500";
        else if (code === "0") colorClass = "";
      } else if (parts[i]) {
        result.push(
          <span key={i} className={colorClass}>
            {parts[i]}
          </span>
        );
      }
    }
    return result.length > 0 ? result : content;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono text-sm">
      <div
        ref={terminalRef}
        className="h-screen overflow-y-auto p-4"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Output lines */}
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "input" ? (
              <>
                <span className="text-highlight">{line.prompt} </span>
                <span className="text-white">{line.content}</span>
              </>
            ) : line.type === "welcome" ? (
              <span className="text-white font-bold">{line.content}</span>
            ) : line.type === "output-dim" ? (
              <span className="text-gray-500">{line.content}</span>
            ) : (
              <span className="text-[#999]">{renderContent(line.content)}</span>
            )}
          </div>
        ))}

        {/* Input line */}
        {!inputLocked && (
          <div className="flex items-center">
            <span className="text-highlight whitespace-pre">{getPrompt()} </span>
            <div className="relative flex-1">
              <span className="text-white whitespace-pre">{currentInput}</span>
              <span className="inline-block w-[0.6em] h-[1.1em] bg-highlight animate-blink align-middle" />
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={e => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 opacity-0 w-full"
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
