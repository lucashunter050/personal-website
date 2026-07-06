import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { StatusPill } from "@/components/hud/status-pill";
import { MonoLabel } from "@/components/hud/mono-label";
import { DataStrip } from "@/components/hud/data-strip";
import { Crosshair } from "@/components/hud/crosshair";
import { SectionHeader } from "@/components/sections/section-header";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Lab() {
  return (
    <section id="lab" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Projects & experiments" title="Lab" flightLevel="FL360" />

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col">
              <CardHeader>
                {project.status ? (
                  <StatusPill variant="bare" live={project.status === "live"} className="mb-1">
                    {project.status === "live" ? "Sim online" : "Sim module offline"}
                  </StatusPill>
                ) : (
                  project.dates && <MonoLabel className="mb-1">{project.dates}</MonoLabel>
                )}
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-3">
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="mt-px select-none font-mono text-xs text-muted-foreground/60">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                {project.status === "offline" && (
                  <Button variant="hud" disabled className="mt-1 w-fit">
                    <Crosshair size={14} /> Boot sequence pending
                  </Button>
                )}
                {project.status === "live" && project.link && (
                  <a
                    href={project.link}
                    className={cn(buttonVariants({ variant: "hud" }), "mt-1 w-fit")}
                  >
                    <Crosshair size={14} /> Launch sim
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <DataStrip
          className="mt-4"
          items={[
            { label: "Repository", value: `${profile.links.githubHandle}/personal-website` },
            { label: "Branch", value: "main" },
            { label: "Deploy", value: "Cloudflare Pages" },
            { label: "Status", value: "All systems stable" },
          ]}
          trailing={
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              View on GitHub <ExternalLink data-icon="inline-end" />
            </a>
          }
        />
      </div>
    </section>
  );
}
