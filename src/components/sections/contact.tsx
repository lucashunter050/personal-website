import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MonoLabel } from "@/components/hud/mono-label";
import { DataStrip } from "@/components/hud/data-strip";
import { ZuluClock } from "@/components/hud/zulu-clock";
import { SectionHeader } from "@/components/sections/section-header";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 pb-16 pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Open channel" title="Contact" flightLevel="FL400" />

        <div className="flex flex-col gap-8">
          <a
            href={`mailto:${profile.links.email}`}
            className="group w-fit font-display text-[clamp(1.5rem,4.5vw,3.5rem)] font-semibold uppercase leading-none tracking-tight stretch-condensed"
          >
            {profile.links.email}
            <span className="ml-2 inline-block transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              GitHub <ArrowUpRight data-icon="inline-end" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              LinkedIn <ArrowUpRight data-icon="inline-end" />
            </a>
            <MonoLabel>Based in {profile.location} — responds fast</MonoLabel>
          </div>

          <DataStrip
            items={[
              { label: "Status", value: "Online" },
              { label: "Position", value: profile.location },
              { label: "Zulu time", value: <ZuluClock /> },
              { label: "Callsign", value: profile.links.githubHandle },
            ]}
            trailing={
              <MonoLabel>© {new Date().getFullYear()} {profile.name}</MonoLabel>
            }
          />
        </div>
      </div>
    </section>
  );
}
