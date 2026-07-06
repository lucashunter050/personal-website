import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MonoLabel } from "@/components/hud/mono-label";
import { SectionHeader } from "@/components/sections/section-header";
import { education, experience } from "@/content/experience";

function Logo({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary font-display text-sm font-semibold uppercase text-primary-foreground stretch-condensed">
        {alt.slice(0, 2)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${alt} logo`}
      className="size-10 shrink-0 rounded-md border border-border bg-white object-contain p-0.5"
    />
  );
}

export function Work() {
  const featured = experience.filter((e) => e.featured);
  const log = experience.filter((e) => !e.featured);

  return (
    <section id="work" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Experience" title="Work" flightLevel="FL240" />

        <div className="flex flex-col gap-4">
          {featured.map((job) => (
            <Card key={job.company}>
              <CardHeader className="grid-cols-[auto_1fr_auto] grid-rows-none items-center gap-x-4">
                <Logo src={job.logo} alt={job.company} />
                <div className="flex flex-col gap-0.5">
                  <CardTitle>
                    {job.role} — {job.company}
                  </CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </div>
                <CardAction className="self-center">
                  <MonoLabel>{job.dates}</MonoLabel>
                </CardAction>
              </CardHeader>
              {(job.contributions.length > 0 || job.tech.length > 0) && (
                <CardContent className="flex flex-col gap-3">
                  {job.contributions.length > 0 && (
                    <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                      {job.contributions.map((c) => (
                        <li key={c} className="flex gap-2.5">
                          <span className="mt-px select-none font-mono text-xs text-muted-foreground/60">
                            →
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}

          {/* Compact history + education */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <MonoLabel>Flight log</MonoLabel>
              </CardHeader>
              <CardContent className="flex flex-col divide-y divide-border">
                {log.map((job) => (
                  <div key={`${job.company}-${job.role}`} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                    <Logo src={job.logo} alt={job.company} />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {job.role} — {job.company}
                      </span>
                      <span className="text-sm text-muted-foreground">{job.description}</span>
                    </div>
                    <MonoLabel className="ml-auto shrink-0 pt-0.5">{job.dates}</MonoLabel>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MonoLabel>Education</MonoLabel>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <Logo src={education.logo} alt={education.school} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{education.school}</span>
                    <span className="text-sm text-muted-foreground">{education.program}</span>
                    <span className="text-sm text-muted-foreground">{education.honors}</span>
                  </div>
                  <MonoLabel className="ml-auto shrink-0 pt-0.5">{education.dates}</MonoLabel>
                </div>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {education.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="mt-px select-none font-mono text-xs text-muted-foreground/60">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
