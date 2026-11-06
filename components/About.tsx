"use client";

import { Art } from "@/lib/art";
import { about } from "@/lib/data";
import { site } from "@/lib/site";
import {
  ActionLink,
  Container,
  Reveal,
  SectionHeader,
} from "./ui";

export function About() {
  return (
    <section
      id="about"
      className="py-[length:var(--space-section)]"
      aria-labelledby="about-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow={about.eyebrow}
            title={about.heading}
            id="about-h"
            aside={
              <ActionLink href="#admissions" variant="text">
                More about {site.wordmark}
              </ActionLink>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7" delay={60}>
            <p className="max-w-3xl font-display text-[clamp(1.5rem,2.7vw,2.35rem)] leading-[1.35] tracking-[-0.02em] text-pretty">
              {about.statement}
            </p>

            <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
              {about.principles.map((principle, i) => (
                <div key={principle.title} className="bg-paper p-5">
                  <span className="font-mono text-[0.5625rem] tracking-[0.16em] text-gray">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-[1.7] text-gray">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="border border-line p-3">
              <div className="aspect-[4/5] w-full overflow-hidden bg-ink">
                <Art
                  seed="about-gwk"
                  tone="ink"
                  className="h-full w-full"
                  label="Abstract plate representing the GWK coastal campus"
                />
              </div>
            </div>
            <p className="mt-4 max-w-md text-[0.75rem] leading-[1.75] text-gray">
              {about.note}
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <dl className="mt-16 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {about.stats.map((stat) => (
              <div key={stat.label} className="bg-paper p-6 lg:p-8">
                <dt className="font-mono text-[0.5625rem] tracking-[0.16em] text-gray uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.04em]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
