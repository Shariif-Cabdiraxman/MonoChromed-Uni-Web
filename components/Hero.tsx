"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slidePhotos, slides } from "@/lib/data";
import { Photo } from "./Photo";
import { ActionLink, ArrowIcon, Container, Eyebrow } from "./ui";

const INTERVAL = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced]);

  return (
    <section
      id="top"
      className="relative border-b border-line bg-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <Container>
        <div className="grid lg:min-h-[44rem] lg:grid-cols-12">
          {/* Editorial panel */}
          <div className="flex flex-col justify-between border-line py-10 lg:col-span-7 lg:border-r lg:py-14 lg:pr-12">
            <div className="flex items-center justify-between gap-6">
              <Eyebrow className="text-gray">Featured story</Eyebrow>
              <span className="font-mono text-[0.625rem] tracking-[0.16em] text-gray">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div
              key={slides[index].id}
              className="my-10 motion-safe:animate-[fadeUp_.7s_cubic-bezier(.22,1,.36,1)_both] lg:my-14"
            >
              <p className="font-mono text-[0.625rem] tracking-[0.16em] text-gray uppercase">
                {slides[index].date}
              </p>

              <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5.8vw,5.25rem)] leading-[0.94] tracking-[-0.04em] text-balance">
                {slides[index].headline}
              </h1>

              <p className="mt-7 max-w-xl text-[0.9375rem] leading-[1.75] text-gray">
                {slides[index].body}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <ActionLink href="#news">{slides[index].cta}</ActionLink>
                <ActionLink href="#about" variant="text">
                  About the university
                </ActionLink>
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
              <div className="flex items-end gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show slide ${i + 1} of ${slides.length}`}
                    aria-current={i === index}
                    className="group flex flex-col gap-2 py-1"
                  >
                    <span
                      className={[
                        "font-mono text-[0.5rem] tracking-[0.14em] transition-colors duration-200",
                        i === index ? "text-ink" : "text-gray",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "block h-[3px] transition-all duration-300",
                        i === index
                          ? "w-12 bg-ink"
                          : "w-6 bg-ink/20 group-hover:bg-ink/45",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center border border-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <ArrowIcon className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center border border-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Art panel — inset on large screens so its frame aligns with the
              editorial content rather than bleeding to the section edges. */}
          <div className="relative min-h-[24rem] overflow-hidden bg-ink sm:min-h-[30rem] lg:col-span-5 lg:my-14 lg:min-h-0">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={[
                  "absolute inset-0 transition-opacity duration-[1100ms] ease-in-out",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
                aria-hidden={i !== index}
              >
                <Photo
                  slug={slidePhotos[s.id] ?? "coast"}
                  alt={s.headline}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
            />

            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-paper">
              <span className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase">
                Photograph {String(index + 1).padStart(2, "0")}
              </span>
              <span className="max-w-[12rem] text-right text-[0.6875rem] leading-snug text-paper/70">
                {slides[index].date}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
