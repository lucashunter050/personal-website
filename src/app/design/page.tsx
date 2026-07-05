import { ArrowRight, Boxes, Cpu, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Kbd } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MonoLabel } from "@/components/hud/mono-label";
import { StatusPill } from "@/components/hud/status-pill";
import { Crosshair } from "@/components/hud/crosshair";
import { CompassTape } from "@/components/hud/compass-tape";
import { TelemetryStat } from "@/components/hud/telemetry-stat";
import { DataStrip } from "@/components/hud/data-strip";

export const metadata = { title: "Design System — Lucas Hunter", robots: { index: false } };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <MonoLabel>{title}</MonoLabel>
        <Separator className="flex-1" />
      </div>
      {children}
    </section>
  );
}

export default function DesignPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-16">
      <header className="flex items-start justify-between">
        <div>
          <MonoLabel>Flightdeck design system</MonoLabel>
          <h1 className="mt-2 font-display text-title uppercase stretch-condensed">
            Component Gallery
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Unlisted review page. Every primitive, both themes — flip with the toggle.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Typography">
        <div className="flex flex-col gap-6">
          <div>
            <MonoLabel>display / Archivo condensed</MonoLabel>
            <div className="font-display text-display uppercase stretch-condensed">
              Lucas Hunter
            </div>
          </div>
          <div>
            <MonoLabel>title</MonoLabel>
            <div className="font-display text-title uppercase stretch-condensed">
              Systems &amp; Interfaces
            </div>
          </div>
          <div>
            <MonoLabel>body / Raleway</MonoLabel>
            <p className="mt-1 max-w-lg text-sm leading-relaxed">
              End-to-end systems from infrastructure to interface. Scalable, observable,
              production-ready — with pixel-level care where people touch it.
            </p>
          </div>
          <div>
            <MonoLabel>label / JetBrains Mono</MonoLabel>
            <div className="mt-1 font-mono text-label uppercase text-muted-foreground">
              SPD 482 KT — ALT 35,000 FT — BOOT SEQUENCE READY
            </div>
          </div>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            Enter portfolio <ArrowRight />
          </Button>
          <Button variant="outline">View on GitHub</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="hud" size="lg">
            <Crosshair size={16} /> Click to start flight sim <ArrowRight />
          </Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
        </div>
      </Section>

      <Section title="Badges & pills">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">TanStack</Badge>
          <Badge variant="solid">New</Badge>
          <StatusPill>Status: Online</StatusPill>
          <StatusPill variant="outline">Deploy ready</StatusPill>
          <StatusPill variant="bare" live={false}>
            Sim module offline
          </StatusPill>
          <Kbd>⌘K</Kbd>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: Boxes,
              title: "Full-stack systems",
              desc: "End-to-end systems from infrastructure to interface. Scalable. Observable. Production-ready.",
            },
            {
              icon: Cpu,
              title: "Agent interfaces",
              desc: "Designing control surfaces for AI agents and human operators to collaborate with confidence.",
            },
            {
              icon: Workflow,
              title: "LLM workflows",
              desc: "Prompt orchestration, tool use, memory, and evaluation for reliable automation.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="group transition-colors hover:border-foreground/30">
              <CardHeader>
                <Icon className="mb-2 size-5" strokeWidth={1.5} />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="HUD — compass tape">
        <CompassTape heading={0} />
      </Section>

      <Section title="HUD — telemetry">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <TelemetryStat label="Requests / min" value="2,851" data={[3, 5, 4, 6, 5, 8, 7, 9, 8, 11]} />
          <TelemetryStat label="Trace latency p95" value="142ms" data={[9, 7, 8, 6, 7, 5, 6, 4, 5, 4]} />
          <TelemetryStat label="Error rate" value="0.02%" data={[2, 1, 3, 1, 2, 1, 1, 2, 1, 1]} />
          <TelemetryStat label="Availability" value="99.98%" />
        </div>
      </Section>

      <Section title="HUD — data strip">
        <DataStrip
          items={[
            { label: "Repository", value: "lucashunter/flightdeck" },
            { label: "Branch", value: "main" },
            { label: "CI / CD", value: "tests passing" },
            { label: "Deploy", value: "ready" },
          ]}
          trailing={
            <Button size="sm">
              View on Git <ArrowRight />
            </Button>
          }
        />
      </Section>

      <footer className="flex items-center gap-3 text-muted-foreground">
        <Crosshair size={16} />
        <MonoLabel>End of gallery</MonoLabel>
      </footer>
    </main>
  );
}
