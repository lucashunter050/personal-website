import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import MobileNav from "../components/MobileNav";
import ProjectsSection from "../components/ProjectsSection";
import ThemeToggle from "../components/ThemeToggle";
import TypewriterText from "../components/TypewriterText";
import styles from "./page.module.css";

export default function Home() {
  // Projects data
  const projects = [
    {
      id: 'openhome',
      title: "OpenHome.xyz Smart Speaker AI Agents",
      description: "Leading AI agent development for voice-activated smart speakers, creating innovative solutions that interface with LLMs and IoT devices over MQTT for commercial smart home integration.",
      expandedContent: "At OpenHome.xyz, I've created more AI abilities than all other developers combined, establishing myself as the lead contributor to our smart speaker platform. My work includes developing sophisticated voice AI systems for diverse applications from gaming strategy to aviation weather briefings. The platform integrates seamlessly with existing smart home ecosystems and leverages cutting-edge LLM technology to provide natural, intelligent responses.",
      techStack: ["Python", "LLMs", "IoT", "MQTT", "Voice AI", "Smart Home"],
      blogPosts: [
        {
          title: "AI Blackjack Strategy Trainer",
          url: "https://openhome.com/blog/ai-blackjack-strategy-trainer"
        },
        {
          title: "Aviation Weather Voice AI",
          url: "https://openhome.com/blog/aviation-weather-voice-ai"
        }
      ],
      isHighlighted: true
    },
    {
      id: 'raytracer',
      title: "C++ Ray Tracer with Global Illumination",
      description: "Enhanced C++ ray tracer featuring global illumination, probabilistic light reflection, soft shadows, and anti-aliasing for photorealistic 3D rendering.",
      expandedContent: "This project implements advanced computer graphics techniques including Monte Carlo path tracing, bidirectional reflectance distribution functions (BRDF), and importance sampling. The ray tracer supports complex material properties, area lights, and produces physically accurate lighting simulations.",
      techStack: ["C++", "OpenGL", "Computer Graphics", "BRDF", "Monte Carlo"],
      githubUrl: "#"
    },
    {
      id: 'kvstore',
      title: "Distributed Key-Value Store",
      description: "Implemented distributed algorithms like Paxos in Go to create a fault-tolerant key-value store mimicking Google's Spanner, ensuring 100% consistency with any number of node failures.",
      expandedContent: "Built from scratch using Go, this distributed system implements the Paxos consensus algorithm to maintain strong consistency across multiple nodes. The system handles network partitions, node failures, and concurrent operations while maintaining ACID properties. Features include automatic leader election, log replication, and client request routing.",
      techStack: ["Go", "Paxos", "Distributed Systems", "Consensus Algorithms", "ACID"],
      githubUrl: "#"
    },
    {
      id: 'rocket',
      title: "USC Rocket Propulsion Simulation",
      description: "Developed C++ simulation software for USC RPL's Fireball rocket launch to 50km altitude. Refactored legacy code for improved performance and maintainability.",
      expandedContent: "Led the software development for USC's rocket simulation system, optimizing aerodynamic calculations and propellant modeling. The refactoring effort reduced compilation time by 40% and improved code maintainability through better documentation and modular design. The simulation accurately predicted the rocket's trajectory to 50km altitude.",
      techStack: ["C++", "Simulation", "Aerospace", "Physics Modeling", "Performance Optimization"],
      githubUrl: "#"
    },
    {
      id: 'promptshare',
      title: "PromptShare Pro Mobile App",
      description: "Designed and built a mobile app in Java using Firebase for users to share, like, and comment on effective AI prompt templates with Material Design components.",
      expandedContent: "Full-stack mobile application featuring real-time synchronization, user authentication, and social features. Implemented Material Design principles for optimal user experience and integrated Firebase for backend services including real-time database, authentication, and cloud storage.",
      techStack: ["Java", "Firebase", "Material Design", "Real-time Database", "Authentication"],
      githubUrl: "#"
    },
    {
      id: 'dineon',
      title: "DineOn USC Dining Review App",
      description: "Developed React front-end for USC dining hall review app with personalized recommendations. Followed Agile methodology with weekly feature planning and Git-based version control.",
      expandedContent: "Built a comprehensive dining review platform with machine learning-powered recommendations. Implemented user preferences tracking, review sentiment analysis, and real-time menu updates. The project followed Agile development practices with sprint planning, daily standups, and continuous integration.",
      techStack: ["React", "JavaScript", "Agile", "Machine Learning", "Sentiment Analysis"],
      githubUrl: "#"
    },
    {
      id: 'speedometer',
      title: "Arduino Radar Gun",
      description: "Built a precision speed measurement device using Arduino Uno and ultrasonic sensors, capable of accurately tracking velocities from 0.1 to 50.0 m/s with embedded C programming.",
      expandedContent: "Leveraged skills in C and embedded systems to build a speedgun from basic electronic components, including an ultrasonic rangefinder, breadboard, and Arduino Uno. Finished speedgun could accurately track speeds ranging from 0.1 to 50.0 m/s.",
      techStack: ["C", "Hardware", "Embedded Systems"],
      githubUrl: "#"
    }
    ,
    // --- Additional Resume-Relevant Projects ---
    {
      id: 'malloclab',
      title: "MallocLab: Custom Memory Allocator",
      description: "Implemented malloc, calloc, and free in C to achieve 95% of standard library performance and memory utilization.",
      expandedContent: "Developed a custom dynamic memory allocator in C for CSCI 356, optimizing for speed and memory efficiency. Matched standard library performance within 5% margin, demonstrating deep understanding of low-level memory management.",
      techStack: ["C", "Memory Management", "Systems Programming"],
    },
    {
      id: 'cachelab',
      title: "CacheLab: CPU Cache Simulator",
      description: "Simulated the behavior of a CPU cache in C, analyzing hit/miss rates and optimizing memory access patterns.",
      expandedContent: "Built a cache simulator for CSCI 356 to mimic real CPU cache operations. Analyzed and improved cache hit/miss rates, gaining hands-on experience with computer architecture and performance tuning.",
      techStack: ["C", "Computer Architecture", "Performance"],
    },
    {
      id: 'attacklab',
      title: "AttackLab: Binary Exploitation",
      description: "Used buffer overflows and return-oriented programming to exploit raw binaries and bypass security mechanisms.",
      expandedContent: "Completed bomb lab and attack lab for CSCI 356, using buffer overflows and ROP to manipulate program control flow and defeat security protections. Gained practical experience in software security and vulnerability analysis.",
      techStack: ["C", "Security", "Buffer Overflow", "ROP"],
    },
    {
      id: 'shardedkv',
      title: "Sharded Key-Value Store (Go)",
      description: "Built a distributed, sharded key-value store using consistent hashing and Paxos for fault-tolerant transactions.",
      expandedContent: "For CSCI 499, implemented a distributed key-value store in Go with sharding and Paxos-based consensus. Supported dynamic re-sharding and robust transaction handling across node clusters, simulating Google Spanner's architecture.",
      techStack: ["Go", "Distributed Systems", "Paxos", "Sharding"],
    },
    {
      id: 'cloudspanner',
      title: "Cloud Spanner Simulation (Go)",
      description: "Simulated Google Cloud Spanner using sharding and Paxos for distributed transactions and node clusters.",
      expandedContent: "Developed a distributed database simulation in Go for CSCI 499, combining sharding and Paxos to model Google Spanner's approach to scalable, consistent transactions across multiple clusters.",
      techStack: ["Go", "Distributed Systems", "Paxos", "Sharding", "Transactions"],
    },
    {
      id: 'terrainmap',
      title: "3D Terrain Map Renderer (C++)",
      description: "Rendered 3D terrain from JPEG heightmaps using OpenGL, with real-time camera movement and lighting.",
      expandedContent: "Created a 3D terrain visualization tool in C++ for CSCI 420, mapping grayscale JPEG images to heightmaps and rendering them with OpenGL. Implemented interactive camera controls and dynamic lighting for realistic visualization.",
      techStack: ["C++", "OpenGL", "3D Graphics"],
    },
    {
      id: 'rollercoaster',
      title: "Roller Coaster Simulation (C++)",
      description: "Simulated a 3D roller coaster ride with real-time rendering and Phong shading in OpenGL.",
      expandedContent: "Built a real-time roller coaster simulation in C++ for CSCI 420, using OpenGL and the Phong lighting model. Designed track geometry and camera movement for an immersive 3D experience.",
      techStack: ["C++", "OpenGL", "3D Graphics", "Simulation"],
    },
    {
      id: 'webserver',
      title: "Multithreaded Web Server (C++)",
      description: "Developed a web server supporting concurrent connections and reliable data transfer protocols.",
      expandedContent: "For CSCI 353, implemented a multithreaded web server in C++ with support for concurrent client connections and custom reliable data transfer. Practiced network programming and protocol design.",
      techStack: ["C++", "Networking", "Multithreading"],
    },
    {
      id: 'p2pnetwork',
      title: "Peer-to-Peer Reliable Network (C++)",
      description: "Created a P2P network of servers implementing a custom reliable data transfer protocol.",
      expandedContent: "Built a peer-to-peer network in C++ for CSCI 353, implementing a custom protocol for reliable data transfer between nodes. Explored distributed networking and fault tolerance.",
      techStack: ["C++", "Networking", "P2P", "Reliability"],
    },
    {
      id: 'minesweeper',
      title: "Minesweeper Android App",
      description: "Developed a Minesweeper game for Android using Java and Firebase for real-time data storage.",
      expandedContent: "For CSCI 310, built a fully functional Minesweeper app in Java with a Firebase backend. Implemented real-time game state storage and user authentication.",
      techStack: ["Java", "Android", "Firebase"],
    },
    {
      id: 'threadlib',
      title: "Threading Library & MLFQ Scheduler (C)",
      description: "Added a custom threading library and multi-level feedback queue scheduler to the xv6 kernel.",
      expandedContent: "For CSCI 350, extended the xv6 operating system in C with a custom threading library and a multi-level feedback queue (MLFQ) scheduler. Improved process management and scheduling efficiency.",
      techStack: ["C", "Operating Systems", "Threads", "Scheduling"],
    },
    {
      id: 'impinterpreter',
      title: "IMP Language Parser & Interpreter (OCaml)",
      description: "Built a parser and interpreter for a simple imperative language using Menhir in OCaml.",
      expandedContent: "For CSCI 431, implemented a parser and interpreter for the IMP language in OCaml using Menhir. Practiced functional programming and language design.",
      techStack: ["OCaml", "Parsing", "Interpreters", "Functional Programming"],
    },
    {
      id: 'calculator',
      title: "Functional Calculator (OCaml)",
      description: "Created a calculator in OCaml using functional programming techniques.",
      expandedContent: "Developed a calculator in OCaml for CSCI 431, applying functional programming paradigms and parser combinators.",
      techStack: ["OCaml", "Functional Programming"],
    },
    {
      id: 'pathtracer',
      title: "Path Tracer (C++)",
      description: "Implemented a physically-based renderer in C++ for photorealistic image synthesis.",
      expandedContent: "Built a path tracer in C++ as a personal project, simulating global illumination and realistic material interactions for high-quality image rendering.",
      techStack: ["C++", "Rendering", "Path Tracing"],
    },
    {
      id: 'travelplanner',
      title: "AI Travel Planner (React Native)",
      description: "Developed a React Native app using Gemini AI to help users plan personalized trips.",
      expandedContent: "Created a travel planning app in React Native that leverages Gemini AI for itinerary generation and trip recommendations based on user preferences.",
      techStack: ["React Native", "AI", "Travel", "Mobile"],
    }
  ];

  return (
    <div className={styles.portfolio}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/android-chrome-512x512.png"
              alt="Lucas Hunter Logo"
              width={32}
              height={32}
              className={styles.logoImage}
            />
            Lucas Hunter
          </Link>
          <div className={styles.navLinks}>
            <Link href="#about" className={styles.navLink}>About</Link>
            <Link href="#projects" className={styles.navLink}>Projects</Link>
            <Link href="#experience" className={styles.navLink}>Experience</Link>
            <Link href="#contact" className={styles.navLink}>Contact</Link>
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <TypewriterText 
                text="Hi, I'm Lucas." 
                speed={80} 
                delay={300}
              />
            </h1>
            <p className={styles.heroSubtitle}>
              A passionate <span className={styles.accent}>software developer</span> specializing in mobile development
            </p>
            <div className={styles.heroButtons}>
              <Link href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                View My Work
              </Link>
              <Link href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
                Get In Touch
              </Link>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://github.com/lucashunter050" className={styles.socialLink}>
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/lucas-hunter-336262221/" className={styles.socialLink}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:lucaspghunter@gmail.com" className={styles.socialLink}>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p className={styles.sectionSubtitle}>
                Get to know me better
              </p>
            </div>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutText}>
                <h3 className={styles.aboutHeading}>Hello! I&apos;m Lucas Hunter.</h3>
                <p className={styles.paragraph}>
                  I studied Computer Science at USC (class of 2025) with a focus on mobile and embedded development. 
                  I am currently working as the sole iOS developer at <a href="https://curtaincall.co/">CurtainCall</a>, where I have taken over and transformed the beta codebase to a modern, iOS 17+ compliant design. 
                  I enjoy building scalable, user-friendly applications across different platforms.
                </p>
                <p className={styles.paragraph}>
                  When I&apos;m not coding, you can find me exploring new technologies, piloting small 
                  airplanes, teaching computer science concepts, or working on personal projects that solve problems in my life.
                </p>
                <div className={styles.skills}>
                  {["Swift", "SwiftUI", "React Native", "iOS", "Python", "C++", "JavaScript", "TypeScript", "Go", "SQL"].map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.aboutImage}>
                <div className={styles.profileImageContainer}>
                  <Image
                    src="/selfie-2.png"
                    alt="Lucas Hunter"
                    width={350}
                    height={350}
                    className={styles.profileImage}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>My Projects</h2>
            <p className={styles.sectionSubtitle}>
              Here are some of the projects I&apos;ve worked on. Filter by technology to find projects relevant to your needs.
            </p>
          </div>
          <ProjectsSection projects={projects} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <p className={styles.sectionSubtitle}>
              My educational and professional journey
            </p>
          </div>
          <div className={styles.timeline}>
            {/* Current Role */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/CurtainCallLogoNoLettersNoAlpha-iOS-Default-1024x1024@1x.png"
                  alt="CurtainCall Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>iOS Developer</h3>
                <p className={styles.timelineCompany}>CurtainCall</p>
                <p className={styles.timelinePeriod}>June 2025 - Present</p>
                <p className={styles.timelineDescription}>
                  Sole iOS developer responsible for quadrupling the codebase size and modernizing the UI. 
                  Leading mobile development efforts and implementing new features for the startup&apos;s iOS application.
                </p>
              </div>
            </div>

            {/* Teaching Assistant */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/USC-Logo-Seal.png"
                  alt="USC Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Undergraduate Teaching Assistant</h3>
                <p className={styles.timelineCompany}>USC Department of Computer Science</p>
                <p className={styles.timelinePeriod}>August 2023 - May 2025</p>
                <p className={styles.timelineDescription}>
                  Held weekly office hours for CSCI-270 (Algorithms), CSCI-360 (AI), and CSCI-353 (Internetworking). 
                  Reinforced lecture content and assisted students with homework and concept understanding.
                </p>
              </div>
            </div>

            {/* Scope */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/scopelogo.jpg"
                  alt="Scope Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Member</h3>
                <p className={styles.timelineCompany}>Scope (USC Programming Club)</p>
                <p className={styles.timelinePeriod}>September 2024 - May 2025</p>
                <p className={styles.timelineDescription}>
                  Active hackathon participant and team leader mentoring freshmen and sophomores in app development. 
                  Led workshops and guided students through building applications using Next.js and React Native, 
                  fostering collaborative learning and hands-on development experience.
                </p>
              </div>
            </div>

            {/* iD Tech Camps */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/id-tech-logo-2.jpg"
                  alt="iD Tech Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Lead Instructor/Assistant Director</h3>
                <p className={styles.timelineCompany}>iD Tech Camps UCLA</p>
                <p className={styles.timelinePeriod}>July 2024 - August 2024</p>
                <p className={styles.timelineDescription}>
                  Taught Machine Learning with Jetson Nano and C++ for Video Game Development. 
                  Designed full lesson plans and guided all ML students to achieve external Nvidia certification.
                </p>
              </div>
            </div>

            {/* USC Rocket Lab */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/usc-rpl.png"
                  alt="USC RPL Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Launch Simulation Software Developer</h3>
                <p className={styles.timelineCompany}>USC Rocket Propulsion Lab (RPL)</p>
                <p className={styles.timelinePeriod}>January 2023 - May 2023</p>
                <p className={styles.timelineDescription}>
                  Developed C++ software for the Fireball rocket launch to 50km altitude. 
                  Led refactoring efforts to improve legacy code documentation and resolve compiler warnings.
                </p>
              </div>
            </div>

            {/* Georgetown */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/gtown-disruptive-tech.svg"
                  alt="Georgetown Disruptive Technology Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Software Developer</h3>
                <p className={styles.timelineCompany}>Georgetown Disruptive Technology</p>
                <p className={styles.timelinePeriod}>September 2021 - May 2022</p>
                <p className={styles.timelineDescription}>
                  Performed technical consulting and product testing for BCRemit&apos;s React Native application, 
                  a UK-based fintech app that has been downloaded over 10,000 times.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Image
                  src="/USC_Trojans_logo.svg.png"
                  alt="USC Trojans Logo"
                  width={24}
                  height={24}
                  className={styles.timelineIconImage}
                />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Bachelor of Science in Computer Science</h3>
                <p className={styles.timelineCompany}>University of Southern California</p>
                <p className={styles.timelinePeriod}>August 2022 - May 2025</p>
                <p className={styles.timelineDescription}>
                  GPA: 3.85. Relevant coursework: Data Structures & Algorithms, Software Engineering, 
                  Distributed Systems, Machine Learning, Computer Graphics, Operating Systems, Functional Programming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <p className={styles.sectionSubtitle}>
              Let&apos;s connect and discuss opportunities
            </p>
          </div>
          <div className={styles.contactContent}>
            <p className={styles.contactText}>
              I graduated in May 2025 and am actively looking for full-time software engineering opportunities. 
              Whether you have a question, want to discuss a potential role, or just want to say hi, feel free to reach out!
            </p>
            <div className={styles.contactButtons}>
              <a href="mailto:lucaspghunter@gmail.com" className={`${styles.btn} ${styles.btnPrimary}`}>
                <Mail size={20} />
                Send Email
              </a>
              <a href="/resume.pdf" target="_blank" className={`${styles.btn} ${styles.btnSecondary}`}>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2024 Lucas Hunter. Built with Next.js and CSS Modules.</p>
        </div>
      </footer>
    </div>
  );
}
