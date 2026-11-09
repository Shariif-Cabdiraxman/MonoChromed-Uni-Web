"use client";

import { useMemo, useState } from "react";
import { Art } from "@/lib/art";
import { researchCards, researchCategories } from "@/lib/data";
import {
  ActionLink,
  Container,
  PairPills,
  Reveal,
  SectionHeader,
  Tab,
} from "./ui";

const PER_PAGE = 4;

export function Research() {
  const [category, setCategory] = useState<string>("date");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (category === "random") {
      // Deterministic shuffle: stable across renders, but visibly reordered.
      const shuffled = [...researchCards];
      let seed = 0x9e3779b9;
      for (let i = shuffled.length - 1; i > 0; i--) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const j = seed % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    if (category === "date") return researchCards;
    return researchCards.filter((c) => c.category === category);
  }, [category]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  // Clamp when the active filter yields fewer pages than the current index.
  const safePage = Math.min(page, pages - 1);
  const visible = filtered.slice(
    safePage * PER_PAGE,
    safePage * PER_PAGE + PER_PAGE,
  );
  const [lead, ...rest] = visible;

  const selectCategory = (id: string) => {
    setCategory(id);
    setPage(0);
  };

  const paginate = (delta: number) => {
    setPage((p) => (Math.min(p, pages - 1) + delta + pages) % pages);
  };

  return (
    <section
      id="research"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="research-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Research & publication"
            title="Fieldwork that leaves a public record."
            id="research-h"
            description="Papers, datasets and long-running observations from across the seven faculties. Open-access entries are marked and published for reuse."
            aside={
              <PairPills
                onPrev={() => paginate(-1)}
                onNext={() => paginate(1)}
                prevDisabled={pages <= 1}
                nextDisabled={pages <= 1}
              />
            }
          />
        </Reveal>

        <Reveal delay={60}>
          <div
            className="mt-10 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter research by category"
          >
            {researchCategories.map((c) => (
              <Tab
                key={c.id}
                active={c.id === category}
                onClick={() => selectCategory(c.id)}
              >
                {c.label}
              </Tab>
            ))}
            <span className="ml-auto hidden font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase sm:block">
              {filtered.length} entries
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            key={`${category}-${safePage}`}
            className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12"
            aria-live="polite"
          >
            {lead ? (
              <article className="group lg:col-span-6">
                <div className="aspect-[16/11] w-full overflow-hidden border border-line bg-ink">
                  <Art
                    seed={`research-${lead.id}`}
                    tone="ink"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                    label={`Abstract plate for ${lead.title}`}
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
                  <span>{lead.date}</span>
                  {lead.linked ? (
                    <span className="border border-line px-2 py-1 text-ink">
                      Open access
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 max-w-xl font-display text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.08] tracking-[-0.025em]">
                  {lead.linked ? (
                    <a
                      href="#research"
                      className="transition-colors duration-200 hover:text-gray"
                    >
                      {lead.title}
                    </a>
                  ) : (
                    lead.title
                  )}
                </h3>

                <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.75] text-gray">
                  {lead.body}
                </p>

                <ActionLink href="#research" variant="text" className="mt-5">
                  Read the paper
                </ActionLink>
              </article>
            ) : null}

            <div className="flex flex-col lg:col-span-6">
              {rest.map((card) => (
                <article
                  key={card.id}
                  className="group flex gap-5 border-t border-line py-6 first:border-t-0 first:pt-0"
                >
                  <div className="aspect-square w-24 shrink-0 overflow-hidden border border-line bg-ink sm:w-32">
                    <Art
                      seed={`research-${card.id}`}
                      tone="ink"
                      className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      label={`Abstract plate for ${card.title}`}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
                      {card.date}
                    </p>
                    <h3 className="mt-2 font-display text-[1.0625rem] leading-snug font-semibold">
                      {card.linked ? (
                        <a
                          href="#research"
                          className="transition-colors duration-200 hover:text-gray"
                        >
                          {card.title}
                        </a>
                      ) : (
                        card.title
                      )}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-[1.7] text-gray">
                      {card.body}
                    </p>
                    <a
                      href="#research"
                      className="mt-3 inline-block font-mono text-[0.5625rem] font-medium tracking-[0.14em] uppercase underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-gray"
                    >
                      View more
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex items-center justify-center gap-3 font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
          <span>
            Page {safePage + 1} of {pages}
          </span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span>{filtered.length} entries</span>
        </div>
      </Container>
    </section>
  );
}
