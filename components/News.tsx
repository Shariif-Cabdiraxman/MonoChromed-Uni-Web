"use client";

import { useState } from "react";
import { Art } from "@/lib/art";
import { newsCards } from "@/lib/data";
import {
  ActionLink,
  Container,
  PairPills,
  Reveal,
  SectionHeader,
} from "./ui";

const PER_PAGE = 4;

export function News() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(newsCards.length / PER_PAGE);
  const visible = newsCards.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const [lead, ...rest] = visible;

  const paginate = (delta: number) => {
    setPage((p) => (p + delta + pages) % pages);
  };

  return (
    <section
      id="news"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="news-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Newsroom"
            title="Latest news"
            id="news-h"
            description="Announcements, agreements and student milestones from the university and its partner institutions."
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
            key={page}
            className="mt-12 grid gap-10 motion-safe:animate-[fadeUp_.5s_cubic-bezier(.22,1,.36,1)_both] lg:grid-cols-12 lg:items-start lg:gap-12"
            aria-live="polite"
          >
            {lead ? (
              <article className="group lg:col-span-7">
                <div className="aspect-[16/10] w-full overflow-hidden border border-line bg-ink">
                  <Art
                    seed={`news-${lead.id}`}
                    tone="ink"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                    label={`Abstract plate for ${lead.title}`}
                  />
                </div>

                <p className="mt-5 font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
                  {lead.date}
                </p>

                <h3 className="mt-3 max-w-2xl font-display text-[clamp(1.7rem,3vw,2.65rem)] leading-[1.06] tracking-[-0.03em]">
                  {lead.linked ? (
                    <a
                      href="#news"
                      className="transition-colors duration-200 hover:text-gray"
                    >
                      {lead.title}
                    </a>
                  ) : (
                    lead.title
                  )}
                </h3>

                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-gray">
                  {lead.body}
                </p>

                <ActionLink href="#news" variant="text" className="mt-5">
                  Read the story
                </ActionLink>
              </article>
            ) : null}

            <div className="flex flex-col lg:col-span-5">
              {rest.map((card) => (
                <article
                  key={card.id}
                  className="group flex gap-5 border-t border-line py-6 first:border-t-0 first:pt-0"
                >
                  <div className="aspect-square w-24 shrink-0 overflow-hidden border border-line bg-ink sm:w-28">
                    <Art
                      seed={`news-${card.id}`}
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
                          href="#news"
                          className="transition-colors duration-200 hover:text-gray"
                        >
                          {card.title}
                        </a>
                      ) : (
                        card.title
                      )}
                    </h3>
                    <a
                      href="#news"
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
            Page {page + 1} of {pages}
          </span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span>{newsCards.length} stories</span>
        </div>
      </Container>
    </section>
  );
}
