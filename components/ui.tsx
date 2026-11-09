"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------ primitives */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-site px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[0.625rem] font-medium tracking-[0.16em] uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Editorial section header: an index rail, a large serif title and an optional
 * control cluster aligned to the baseline of the title.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  aside,
  id,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 border-b border-line pb-4">
        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-gray">
          {index}
        </span>
        <span aria-hidden className="h-px w-8 bg-line" />
        <Eyebrow className="text-ink">{eyebrow}</Eyebrow>
        <span aria-hidden className="ml-auto hidden font-mono text-[0.625rem] tracking-[0.16em] text-gray sm:block">
          XEEB / Index
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
        <div>
          <h2
            id={id}
            className="max-w-4xl font-display text-[clamp(2.1rem,4.8vw,4.25rem)] leading-[0.98] tracking-[-0.035em] text-balance"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.75] text-gray">
              {description}
            </p>
          ) : null}
        </div>
        {aside ? <div className="lg:pb-2">{aside}</div> : null}
      </div>
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`h-[0.7em] w-[0.7em] ${className}`}
      fill="none"
    >
      <path
        d="M5.5 3.5 10 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: { className?: string }) {
  return <ArrowIcon className={className} />;
}

type ActionVariant = "solid" | "outline" | "paper" | "text";

const actionStyles: Record<ActionVariant, string> = {
  solid:
    "bg-ink text-paper hover:bg-gray focus-visible:bg-gray",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-paper",
  paper:
    "bg-paper text-ink hover:bg-gray hover:text-paper",
  text: "link-underline px-0 py-0 text-ink hover:text-gray",
};

/**
 * Primary action. Renders an anchor so every CTA is a real navigation target.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  chevron = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  chevron?: boolean;
  className?: string;
}) {
  const isText = variant === "text";
  return (
    <a
      href={href}
      className={[
        "group inline-flex items-center justify-center gap-3 font-mono text-[0.6875rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-200",
        isText ? "" : "px-5 py-3.5",
        actionStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
      {chevron ? (
        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}

export function DatePill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border border-line px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-gray uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ tabs */

export function Tab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "border px-3.5 py-2 font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase",
        "transition-colors duration-200",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-paper text-ink hover:border-ink hover:bg-ink/5",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** Previous / Next control pair. */
export function PairPills({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}) {
  const cls =
    "inline-flex h-9 items-center gap-2 border border-ink px-3.5 font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase text-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-paper disabled:hover:text-ink";
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        className={cls}
      >
        <ArrowIcon className="rotate-180" />
        Previous
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={cls}
      >
        Next
        <ArrowIcon />
      </button>
    </div>
  );
}

/* --------------------------------------------------------- scroll reveal */

/**
 * Fades and lifts children into view once, on first intersection.
 * Renders children immediately so a disabled observer degrades gracefully.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.shown = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- icon set */

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m12.8 12.8 4 4" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
    </svg>
  );
}
