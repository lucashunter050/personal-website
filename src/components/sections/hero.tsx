"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompassTape } from "@/components/hud/compass-tape";
import { Crosshair } from "@/components/hud/crosshair";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

const hudReveal = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, delay: 0.15 } },
};

const nameReveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.45, ease } },
};

const ctaReveal = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.85, ease } },
};

const statusReveal = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, delay: 1.15 } },
};

function HudReadout({ lines, align = "left" }: { lines: [string, string][]; align?: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-1 font-mono text-label uppercase ${align === "right" ? "text-right" : ""}`}>
      {lines.map(([k, v]) => (
        <div key={k} className="flex gap-3">
          <span className={align === "right" ? "ml-auto" : ""}>{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-[600px] overflow-hidden bg-[#101722] text-white"
    >
      {/* Sky plates — light/dark, landscape/portrait */}
      <motion.div style={{ y: skyY }} className="absolute -inset-y-[7%] inset-x-0">
        <img
          src="/backgrounds/sky-hero-sunset.jpg"
          alt=""
          className="absolute inset-0 hidden size-full object-cover md:block dark:md:hidden"
          fetchPriority="high"
        />
        <img
          src="/backgrounds/sky-day-portrait.jpg"
          alt=""
          className="absolute inset-0 block size-full object-cover md:hidden dark:hidden"
          fetchPriority="high"
        />
        {/* TODO: replace with a landscape night plate; portrait crop is a stopgap on desktop */}
        <img
          src="/backgrounds/sky-night-portrait.jpg"
          alt=""
          className="absolute inset-0 hidden size-full object-cover dark:block"
          fetchPriority="high"
        />
      </motion.div>

      {/* Cockpit frame — desktop only */}
      <img
        src="/backgrounds/cockpit-frame-day.png"
        alt=""
        className="pointer-events-none absolute inset-0 hidden size-full select-none object-cover object-bottom md:block dark:md:hidden"
      />
      <img
        src="/backgrounds/cockpit-frame-night.png"
        alt=""
        className="pointer-events-none absolute inset-0 hidden size-full select-none object-cover object-bottom dark:md:block"
      />

      {/* HUD chrome */}
      <motion.div
        variants={hudReveal}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0 text-white/70"
        aria-hidden="true"
      >
        <div className="absolute left-6 top-6 md:left-10 md:top-8">
          <HudReadout lines={[["SPD", "482 KT"], ["M", "0.78"]]} />
        </div>
        <div className="absolute right-6 top-6 md:right-10 md:top-8">
          <HudReadout align="right" lines={[["ALT", "35,000 FT"], ["VS", "0 FPM"]]} />
        </div>
        <CompassTape
          heading={0}
          className="absolute left-1/2 top-7 hidden w-[520px] -translate-x-1/2 text-white/70 md:block"
        />
        <Crosshair
          size={44}
          strokeWidth={0.75}
          className="absolute left-1/2 top-[42%] hidden -translate-x-1/2 -translate-y-1/2 text-white/40 md:block"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-6 bottom-[12%] z-10 md:inset-x-auto md:left-14 md:max-w-[54%]"
      >
        <motion.div variants={nameReveal} initial="hidden" animate="show">
          <h1 className="font-display text-display uppercase stretch-condensed">
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-label-lg uppercase tracking-[0.3em] text-white/85">
            {profile.tagline}
          </p>
        </motion.div>

        <motion.div
          variants={ctaReveal}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button
            size="lg"
            className="h-11 bg-white px-6 text-neutral-900 hover:bg-white/85"
            onClick={() =>
              document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Enter portfolio <ArrowDown />
          </Button>
          <Button
            variant="hud"
            size="lg"
            disabled
            className="h-11 border-white/40 px-5 text-white/80"
            title="Simulator module offline — rebuild in progress"
          >
            <Crosshair size={15} /> Start flight sim
          </Button>
          <span className="basis-full font-mono text-label uppercase text-white/50">
            Sim module offline
          </span>
        </motion.div>
      </motion.div>

      {/* Boot status */}
      <motion.div
        variants={statusReveal}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 font-mono text-label uppercase text-white/80 md:flex md:right-10"
      >
        Boot sequence ready
        <span className="size-1.5 animate-pulse rounded-full bg-status" />
      </motion.div>
    </section>
  );
}
