"use client";

import { useState } from "react";
import { Art } from "@/lib/art";
import { courseSearch } from "@/lib/data";
import {
  ActionLink,
  ArrowIcon,
  Container,
  Reveal,
  SectionHeader,
  Tab,
} from "./ui";

export function CourseSearch() {
  const [track, setTrack] = useState<string>(courseSearch.tracks[0].id);
  const [open, setOpen] = useState<string | null>(courseSearch.tracks[0].id);

  const active =
    courseSearch.tracks.find((t) => t.id === track) ?? courseSearch.tracks[0];
  const activeIndex = courseSearch.tracks.findIndex((t) => t.id === active.id);

  const selectTrack = (id: string) => {
    setTrack(id);
    setOpen(id);
  };

  const stepTrack = (delta: number) => {
    const next =
      (activeIndex + delta + courseSearch.tracks.length) %
      courseSearch.tracks.length;
    selectTrack(courseSearch.tracks[next].id);
  };

  return (
    <section
      id="admissions"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="course-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow={courseSearch.eyebrow}
            title={courseSearch.heading}
            id="course-h"
            description={courseSearch.body}
            aside={
              <div
                className="flex items-center gap-2"
                role="group"
                aria-label="Programme level"
              >
                {courseSearch.tracks.map((t) => (
                  <Tab
                    key={t.id}
                    active={t.id === track}
                    onClick={() => selectTrack(t.id)}
                  >
                    {t.label}
                  </Tab>
                ))}
              </div>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Programme detail */}
          <Reveal className="lg:col-span-7" delay={60}>
            <div className="border border-line">
              <div className="border-b border-line bg-ink p-6 text-paper sm:p-8">
                <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-paper/60 uppercase">
                  {active.label} study
                </p>
                <h3 className="mt-4 max-w-xl font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.12] tracking-[-0.025em]">
                  {active.label === "Undergraduate"
                    ? "Three years of study, with field time from the first term."
                    : "Advanced study in a research-active coastal institution."}
                </h3>
                <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.75] text-paper/70">
                  {active.summary}
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <ol className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
                  {courseSearch.process.map((step, i) => (
                    <li key={step.title} className="bg-paper p-4">
                      <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-gray">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 font-display text-lg font-semibold">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[0.75rem] leading-[1.6] text-gray">
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 max-w-lg border-t border-line">
                  {courseSearch.tracks.map((t) => {
                    const isOpen = open === t.id;
                    return (
                      <div key={t.id} className="border-b border-line">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : t.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-gray"
                        >
                          <span className="font-display text-lg font-semibold">
                            {t.label === "Undergraduate"
                              ? "Undergraduates"
                              : "Postgraduates"}
                          </span>
                          <span
                            aria-hidden
                            className={[
                              "text-xl leading-none transition-transform duration-300",
                              isOpen ? "rotate-45" : "rotate-0",
                            ].join(" ")}
                          >
                            +
                          </span>
                        </button>

                        <div
                          className={[
                            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0",
                          ].join(" ")}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-6 text-[0.875rem] leading-[1.75] text-gray">
                              {t.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <ActionLink href="#admissions" className="mt-8">
                  Search courses
                </ActionLink>
              </div>
            </div>
          </Reveal>

          {/* Art panel + facts */}
          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="m-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-ink sm:aspect-[5/4] lg:aspect-[4/5]">
                {courseSearch.tracks.map((t, i) => (
                  <div
                    key={t.id}
                    className={[
                      "absolute inset-0 transition-opacity duration-700 ease-in-out",
                      i === activeIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0",
                    ].join(" ")}
                    aria-hidden={i !== activeIndex}
                  >
                    <Art
                      seed={`course-${t.id}`}
                      tone="ink"
                      className="h-full w-full"
                      label={
                        i === activeIndex ? `${t.label} programmes` : undefined
                      }
                    />
                  </div>
                ))}

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30"
                />

                <div className="absolute top-5 left-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => stepTrack(-1)}
                    aria-label="Previous panel"
                    className="flex h-9 w-9 items-center justify-center border border-paper/40 bg-ink/60 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-paper hover:text-ink"
                  >
                    <ArrowIcon className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepTrack(1)}
                    aria-label="Next panel"
                    className="flex h-9 w-9 items-center justify-center border border-paper/40 bg-ink/60 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-paper hover:text-ink"
                  >
                    <ArrowIcon />
                  </button>
                </div>

                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-paper">
                  <span className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(courseSearch.tracks.length).padStart(2, "0")}
                  </span>
                  <span className="text-[0.6875rem] text-paper/70">
                    {active.label}
                  </span>
                </div>
              </div>

              <figcaption className="mt-4 text-[0.75rem] leading-[1.75] text-gray">
                {courseSearch.imageCaption}
              </figcaption>
            </figure>

            <dl className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
              {courseSearch.facts.map((fact) => (
                <div key={fact.label} className="bg-paper p-4">
                  <dt className="font-mono text-[0.5rem] tracking-[0.14em] text-gray uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
