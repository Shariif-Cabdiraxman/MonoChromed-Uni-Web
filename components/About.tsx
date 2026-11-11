"use client";

import { about, aboutPhoto } from "@/lib/data";
import { site } from "@/lib/site";
import { Photo } from "./Photo";
import { ActionLink, Container, Reveal, SectionHeader } from "./ui";

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

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-7" delay={60}>
            <p className="max-w-3xl font-display text-[clamp(1.5rem,2.7vw,2.35rem)] leading-[1.35] tracking-[-0.02em] text-pretty">
              {about.statement}
            </p>

            <div className="mt-10 border-t border-line">
              {about.principles.map((principle, i) => (
                <div
                  key={principle.title}
                  className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-line py-6 sm:grid-cols-12 sm:items-start"
                >
                  <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.16em] text-gray sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-semibold sm:col-span-4">
                    {principle.title}
                  </h3>
                  <p className="text-[0.875rem] leading-[1.75] text-gray sm:col-span-7">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>

            <ActionLink href="#faculties" variant="outline" className="mt-10">
              Explore the faculties
            </ActionLink>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="m-0">
              <div className="border border-line p-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <Photo
                    slug={aboutPhoto}
                    alt="The Xeeb University coastal campus"
                    sizes="(min-width: 1024px) 36vw, 100vw"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-start gap-3 text-[0.75rem] leading-[1.75] text-gray">
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-6 shrink-0 bg-line"
                />
                <span>{about.note}</span>
              </figcaption>
            </figure>
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
