"use client";

import { useState, type KeyboardEvent } from "react";
import { Art } from "@/lib/art";
import { faculties, facultyNote } from "@/lib/data";
import {
  ActionLink,
  ArrowIcon,
  Container,
  Reveal,
  SectionHeader,
} from "./ui";

export function Faculties() {
  const [active, setActive] = useState(faculties[0].slug);
  const faculty = faculties.find((f) => f.slug === active) ?? faculties[0];

  const select = (slug: string) => setActive(slug);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % faculties.length;
    if (event.key === "ArrowUp") {
      next = (index - 1 + faculties.length) % faculties.length;
    }
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = faculties.length - 1;

    const slug = faculties[next].slug;
    setActive(slug);
    document.getElementById(`faculty-tab-${slug}`)?.focus();
  };

  return (
    <section
      id="faculties"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="faculties-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Faculties"
            title="Seven faculties. One coastline."
            id="faculties-h"
            description="Each faculty keeps a distinct teaching culture, while sharing the field stations, laboratories and public partnerships that define the university."
            aside={
              <span className="font-mono text-[0.625rem] tracking-[0.16em] text-gray uppercase">
                07 / Profiles
              </span>
            }
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 grid border border-line lg:grid-cols-12">
            {/* Faculty index */}
            <div className="border-b border-line p-5 sm:p-7 lg:col-span-4 lg:border-r lg:border-b-0">
              <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-gray uppercase">
                Faculty index
              </p>

              <div
                role="tablist"
                aria-label="Faculties"
                aria-orientation="vertical"
                className="mt-5 border-t border-line"
              >
                {faculties.map((f, i) => {
                  const selected = f.slug === active;
                  return (
                    <button
                      key={f.slug}
                      id={`faculty-tab-${f.slug}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`faculty-panel-${f.slug}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(f.slug)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      className="group relative flex w-full items-start gap-4 border-b border-line py-3.5 text-left"
                    >
                      <span
                        aria-hidden
                        className={[
                          "absolute top-0 bottom-0 -left-5 w-px bg-ink transition-opacity duration-200 sm:-left-7",
                          selected ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "mt-0.5 font-mono text-[0.5625rem] tracking-[0.14em] transition-colors duration-200",
                          selected ? "text-ink" : "text-gray",
                        ].join(" ")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={[
                          "flex-1 font-display text-[1.0625rem] leading-snug font-semibold transition-colors duration-200",
                          selected
                            ? "text-ink"
                            : "text-gray group-hover:text-ink",
                        ].join(" ")}
                      >
                        {f.name}
                      </span>
                      <ArrowIcon
                        className={[
                          "mt-1 shrink-0 transition-all duration-200",
                          selected
                            ? "text-ink"
                            : "-translate-x-1 text-gray opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 max-w-sm text-[0.75rem] leading-[1.75] text-gray">
                <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-ink uppercase">
                  Note
                </span>{" "}
                — {facultyNote}
              </p>
            </div>

            {/* Featured profile */}
            <div className="p-5 sm:p-7 lg:col-span-8">
              <div
                key={faculty.slug}
                id={`faculty-panel-${faculty.slug}`}
                role="tabpanel"
                aria-labelledby={`faculty-tab-${faculty.slug}`}
                className="motion-safe:animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)_both]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-ink">
                  <Art
                    seed={`faculty-${faculty.slug}`}
                    tone="ink"
                    className="h-full w-full"
                    label={`${faculty.name} — abstract plate`}
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-line pb-4 font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
                  <span>Established {faculty.since}</span>
                  <span aria-hidden className="h-3 w-px bg-line" />
                  <span>Faculty profile</span>
                </div>

                <h3 className="mt-6 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.06] tracking-[-0.03em]">
                  {faculty.name}
                </h3>

                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-gray">
                  {faculty.summary}
                </p>

                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.75]">
                  {faculty.detail}
                </p>

                <ActionLink
                  href="#admissions"
                  variant="outline"
                  className="mt-8"
                >
                  Explore this faculty
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
