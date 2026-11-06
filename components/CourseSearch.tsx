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

  return (
    <section
      id="admissions"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="course-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
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

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Programme detail */}
          <Reveal className="lg:col-span-6" delay={60}>
            <div>
              <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-gray uppercase">
                {active.label} study
              </p>
              <h3 className="mt-3 max-w-lg font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.12] tracking-[-0.025em]">
                {active.label === "Undergraduate"
                  ? "Three years of study, with field time from the first term."
                  : "Advanced study in a research-active coastal institution."}
              </h3>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-gray">
                {active.summary}
              </p>

              <ol className="mt-8 grid grid-cols-3 gap-px border border-line bg-line">
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
          </Reveal>

          {/* Art panel + facts */}
          <Reveal className="lg:col-span-6" delay={120}>
            <div>
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

                <div className="absolute top-5 left-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      selectTrack(
                        courseSearch.tracks[
                          (activeIndex + courseSearch.tracks.length - 1) %
                            courseSearch.tracks.length
                        ].id,
                      )
                    }
                    aria-label="Previous panel"
                    className="flex h-8 w-8 items-center justify-center bg-ink/85 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-gray"
                  >
                    <ArrowIcon className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectTrack(
                        courseSearch.tracks[
                          (activeIndex + 1) % courseSearch.tracks.length
                        ].id,
                      )
                    }
                    aria-label="Next panel"
                    className="flex h-8 w-8 items-center justify-center bg-ink/85 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-gray"
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

              <p className="mt-4 max-w-lg text-[0.75rem] leading-[1.75] text-gray">
                {courseSearch.imageCaption}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
