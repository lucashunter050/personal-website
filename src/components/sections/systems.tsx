import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TelemetryStat } from "@/components/hud/telemetry-stat";
import { SectionHeader } from "@/components/sections/section-header";
import { capabilities } from "@/content/capabilities";

export function Systems() {
  return (
    <section id="systems" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Developer capability" title="Systems" flightLevel="FL120" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group transition-shadow hover:ring-foreground/25">
              <CardHeader>
                <Icon className="mb-2 size-5" strokeWidth={1.5} />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <div className="mt-auto px-4 pb-1">
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <TelemetryStat label="Requests / min" value="2,851" data={[3, 5, 4, 6, 5, 8, 7, 9, 8, 11]} />
          <TelemetryStat label="Trace latency p95" value="142ms" data={[9, 7, 8, 6, 7, 5, 6, 4, 5, 4]} />
          <TelemetryStat label="Error rate" value="0.02%" data={[2, 1, 3, 1, 2, 1, 1, 2, 1, 1]} />
          <TelemetryStat label="Availability" value="99.98%" data={[8, 8, 9, 8, 9, 9, 8, 9, 9, 9]} />
        </div>
      </div>
    </section>
  );
}
