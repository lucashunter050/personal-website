import Link from "next/link";
import { Github, Linkedin, Mail, Code, User, Briefcase, GraduationCap } from "lucide-react";
import MobileNav from "../components/MobileNav";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.portfolio}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            Lucas Hunter
          </Link>
          <div className={styles.navLinks}>
            <Link href="#about" className={styles.navLink}>About</Link>
            <Link href="#projects" className={styles.navLink}>Projects</Link>
            <Link href="#experience" className={styles.navLink}>Experience</Link>
            <Link href="#contact" className={styles.navLink}>Contact</Link>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Hi, I&apos;m Lucas Hunter
            </h1>
            <p className={styles.heroSubtitle}>
              A passionate <span className={styles.accent}>Software Engineer</span> specializing in mobile and backend development, bringing innovative solutions to life through clean, efficient code.
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
                  I&apos;m a Computer Science student at USC (graduating May 2025) with a passion for mobile and backend development. 
                  Currently working as the sole iOS developer at CurtainCall, where I&apos;ve quadrupled the codebase size and modernized the UI. 
                  I enjoy building scalable, user-friendly applications across different platforms.
                </p>
                <p className={styles.paragraph}>
                  When I&apos;m not coding, you can find me exploring new technologies, piloting small 
                  airplanes, teaching computer science concepts, or working on personal projects that solve real-world problems.
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
                <div className={styles.profilePlaceholder}>
                  <User size={120} />
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
              Here are some of the projects I&apos;ve worked on
            </p>
          </div>
          <div className={styles.projectsGrid}>
            {/* Project 1 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Code size={32} />
              </div>
              <h3 className={styles.cardTitle}>C++ Ray Tracer with Global Illumination</h3>
              <p className={styles.cardDescription}>
                Enhanced C++ ray tracer featuring global illumination, probabilistic light reflection, 
                soft shadows, and anti-aliasing for photorealistic 3D rendering.
              </p>
              <div className={styles.techTags}>
                <span className={styles.techTag}>C++</span>
                <span className={styles.techTag}>OpenGL</span>
                <span className={styles.techTag}>Computer Graphics</span>
              </div>
              <div className={styles.cardLinks}>
                <a href="#" className={styles.cardLink}>
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Code size={32} />
              </div>
              <h3 className={styles.cardTitle}>Distributed Key-Value Store</h3>
              <p className={styles.cardDescription}>
                Implemented distributed algorithms like Paxos in Go to create a fault-tolerant key-value store 
                mimicking Google&apos;s Spanner, ensuring 100% consistency with any number of node failures.
              </p>
              <div className={styles.techTags}>
                <span className={styles.techTag}>Go</span>
                <span className={styles.techTag}>Paxos</span>
                <span className={styles.techTag}>Distributed Systems</span>
              </div>
              <div className={styles.cardLinks}>
                <a href="#" className={styles.cardLink}>
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Code size={32} />
              </div>
              <h3 className={styles.cardTitle}>USC Rocket Propulsion Simulation</h3>
              <p className={styles.cardDescription}>
                Developed C++ simulation software for USC RPL&apos;s Fireball rocket launch to 50km altitude. 
                Refactored legacy code for improved performance and maintainability.
              </p>
              <div className={styles.techTags}>
                <span className={styles.techTag}>C++</span>
                <span className={styles.techTag}>Simulation</span>
                <span className={styles.techTag}>Aerospace</span>
              </div>
              <div className={styles.cardLinks}>
                <a href="#" className={styles.cardLink}>
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Code size={32} />
              </div>
              <h3 className={styles.cardTitle}>PromptShare Pro Mobile App</h3>
              <p className={styles.cardDescription}>
                Designed and built a mobile app in Java using Firebase for users to share, like, and comment 
                on effective AI prompt templates with Material Design components.
              </p>
              <div className={styles.techTags}>
                <span className={styles.techTag}>Java</span>
                <span className={styles.techTag}>Firebase</span>
                <span className={styles.techTag}>Material Design</span>
              </div>
              <div className={styles.cardLinks}>
                <a href="#" className={styles.cardLink}>
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>

            {/* Project 5 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Code size={32} />
              </div>
              <h3 className={styles.cardTitle}>DineOn USC Dining Review App</h3>
              <p className={styles.cardDescription}>
                Developed React front-end for USC dining hall review app with personalized recommendations. 
                Followed Agile methodology with weekly feature planning and Git-based version control.
              </p>
              <div className={styles.techTags}>
                <span className={styles.techTag}>React</span>
                <span className={styles.techTag}>JavaScript</span>
                <span className={styles.techTag}>Agile</span>
              </div>
              <div className={styles.cardLinks}>
                <a href="#" className={styles.cardLink}>
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>

            {/* Project 6 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Code size={32} />
              </div>
              <h3 className={styles.cardTitle}>Smart Speaker AI Agents</h3>
              <p className={styles.cardDescription}>
                Currently developing voice-activated smart speaker agents using Python, interfacing with LLMs 
                and IoT devices over MQTT for commercial smart home integration.
              </p>
              <div className={styles.techTags}>
                <span className={styles.techTag}>Python</span>
                <span className={styles.techTag}>LLMs</span>
                <span className={styles.techTag}>IoT</span>
                <span className={styles.techTag}>MQTT</span>
              </div>
              <div className={styles.cardLinks}>
                <a href="#" className={styles.cardLink}>
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>
          </div>
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
                <Briefcase size={24} />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>iOS Developer</h3>
                <p className={styles.timelineCompany}>CurtainCall</p>
                <p className={styles.timelinePeriod}>June 2024 - Present</p>
                <p className={styles.timelineDescription}>
                  Sole iOS developer responsible for quadrupling the codebase size and modernizing the UI. 
                  Leading mobile development efforts and implementing new features for the startup&apos;s iOS application.
                </p>
              </div>
            </div>

            {/* Teaching Assistant */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <GraduationCap size={24} />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Undergraduate Teaching Assistant</h3>
                <p className={styles.timelineCompany}>USC Department of Computer Science</p>
                <p className={styles.timelinePeriod}>August 2023 - Present</p>
                <p className={styles.timelineDescription}>
                  Hold weekly office hours for CSCI-270 (Algorithms), CSCI-360 (AI), and CSCI-353 (Internetworking). 
                  Reinforce lecture content and assist students with homework and concept understanding.
                </p>
              </div>
            </div>

            {/* iD Tech Camps */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Briefcase size={24} />
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
                <Briefcase size={24} />
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
                <Briefcase size={24} />
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
                <GraduationCap size={24} />
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
              I&apos;m graduating in May 2025 and actively looking for full-time software engineering opportunities. 
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
