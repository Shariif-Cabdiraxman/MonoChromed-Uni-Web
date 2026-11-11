"use client";

import { useEffect, useRef, useState } from "react";
import { campusVisitPhoto } from "@/lib/data";
import { nav, site } from "@/lib/site";
import { Photo } from "./Photo";
import {
  ActionLink,
  ArrowIcon,
  CloseIcon,
  Container,
  MenuIcon,
  SearchIcon,
} from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [mega, setMega] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer or search sheet is open.
  useEffect(() => {
    const locked = drawer || search;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer, search]);

  useEffect(() => {
    if (search) searchRef.current?.focus();
  }, [search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
        setSearch(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Utility bar — scrolls away so the sticky header stays compact. */}
      <div className="hidden border-b border-line bg-paper md:block">
        <Container>
          <div className="flex h-9 items-center justify-between font-mono text-[0.5625rem] tracking-[0.16em] text-gray uppercase">
            <div className="flex items-center gap-6">
              <span>{site.location}</span>
              <span aria-hidden className="h-3 w-px bg-line" />
              <span>{site.term}</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#admissions"
                className="link-underline transition-colors duration-200 hover:text-ink"
              >
                Student portal
              </a>
              <a
                href="#admissions"
                className="link-underline transition-colors duration-200 hover:text-ink"
              >
                Apply
              </a>
            </div>
          </div>
        </Container>
      </div>

      <header
        className={[
          "sticky top-0 z-50 border-b border-line bg-paper transition-shadow duration-300",
          scrolled ? "shadow-header" : "shadow-none",
        ].join(" ")}
      >
        <Container>
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <a href="#top" className="group flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-ink bg-ink text-paper transition-colors duration-200 group-hover:bg-paper group-hover:text-ink">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="square"
                >
                  <path d="m4 4 12 12M16 4 4 16" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.35rem] font-bold tracking-[0.04em]">
                  {site.wordmark}
                </span>
                <span className="mt-1 font-mono text-[0.5rem] tracking-[0.22em] text-gray uppercase">
                  University
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="link-underline py-1 font-mono text-[0.625rem] font-medium tracking-[0.13em] uppercase transition-colors duration-200 hover:text-gray"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSearch((v) => !v);
                  setMega(false);
                }}
                aria-expanded={search}
                aria-controls="search-panel"
                className="flex h-9 items-center gap-2 px-2.5 font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 hover:text-gray"
              >
                <SearchIcon className="h-[17px] w-[17px]" />
                <span className="hidden sm:inline">Search</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMega((v) => !v);
                  setSearch(false);
                }}
                aria-expanded={mega}
                aria-controls="site-index"
                className={[
                  "hidden h-9 items-center gap-2 px-2.5 font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 lg:flex",
                  mega ? "text-ink" : "hover:text-gray",
                ].join(" ")}
              >
                <MenuIcon className="h-[17px] w-[17px]" />
                Index
                <ArrowIcon
                  className={[
                    "rotate-90 transition-transform duration-300",
                    mega ? "-rotate-90" : "",
                  ].join(" ")}
                />
              </button>

              <ActionLink href="#admissions" className="ml-2 max-sm:hidden">
                Apply
              </ActionLink>

              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label="Open menu"
                aria-expanded={drawer}
                aria-controls="mobile-drawer"
                className="flex h-9 w-9 items-center justify-center border border-line transition-colors duration-200 hover:border-ink lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>

        {/* Mega index panel */}
        <div
          id="site-index"
          className={[
            "overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-500 ease-out",
            mega
              ? "visible max-h-[40rem] opacity-100"
              : "invisible max-h-0 opacity-0",
          ].join(" ")}
          aria-hidden={!mega}
        >
          <Container>
            <div className="grid gap-8 py-8 lg:grid-cols-12 lg:gap-12">
              <nav
                aria-label="Site index"
                className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7"
              >
                {nav.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMega(false)}
                    className="group flex items-start gap-4 border-b border-line-soft py-4 transition-colors duration-200 hover:text-gray"
                  >
                    <span className="mt-1.5 font-mono text-[0.5625rem] tracking-[0.14em] text-gray">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="link-underline font-display text-lg font-semibold">
                          {item.label}
                        </span>
                        <ArrowIcon className="shrink-0 text-gray transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="mt-1 block text-[0.75rem] leading-relaxed text-gray">
                        {item.note}
                      </span>
                    </span>
                  </a>
                ))}
              </nav>

              <a
                href="#admissions"
                onClick={() => setMega(false)}
                className="group relative block overflow-hidden border border-line bg-ink lg:col-span-5"
              >
                <div className="relative aspect-[16/11] w-full">
                  <Photo
                    slug={campusVisitPhoto}
                    alt="Campus visits at Xeeb University"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-paper">
                  <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-paper/60 uppercase">
                    Visit the campus
                  </p>
                  <p className="mt-3 max-w-xs font-display text-2xl leading-tight">
                    Open days run through the autumn term.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.14em] uppercase">
                    Book a visit
                    <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </div>
          </Container>
        </div>

        {/* Search sheet */}
        <div
          id="search-panel"
          role="region"
          aria-label="Site search"
          className={[
            "overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-300 ease-out",
            search
              ? "visible max-h-64 opacity-100"
              : "invisible max-h-0 opacity-0",
          ].join(" ")}
          aria-hidden={!search}
        >
          <Container>
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="py-6"
            >
              <label htmlFor="site-search" className="sr-only">
                Search the site
              </label>
              <div className="flex items-center gap-4 border-b border-ink pb-3">
                <SearchIcon className="h-5 w-5 shrink-0 text-gray" />
                <input
                  ref={searchRef}
                  id="site-search"
                  type="search"
                  placeholder="Search programmes, research, news…"
                  className="w-full bg-transparent text-[1.0625rem] outline-none placeholder:text-gray"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-ink px-5 py-2.5 font-mono text-[0.625rem] font-semibold tracking-[0.14em] text-paper uppercase transition-colors duration-200 hover:bg-gray"
                >
                  Search
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
                <span>Popular:</span>
                {["Admissions", "Research", "Faculties", "News"].map((term) => (
                  <a
                    key={term}
                    href={`#${term.toLowerCase()}`}
                    className="link-underline transition-colors duration-200 hover:text-ink"
                  >
                    {term}
                  </a>
                ))}
              </div>
            </form>
          </Container>
        </div>

        {/* Mobile drawer */}
        <div
          className={[
            "fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
            drawer
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0",
          ].join(" ")}
          onClick={() => setDrawer(false)}
          aria-hidden
        />
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={[
            "fixed inset-y-0 right-0 z-[70] flex w-[min(90vw,400px)] flex-col bg-paper transition-transform duration-300 ease-out lg:hidden",
            drawer
              ? "visible translate-x-0"
              : "invisible translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
            <span className="font-display text-[1.35rem] font-bold">
              {site.wordmark}
            </span>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center border border-line transition-colors duration-200 hover:border-ink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            {nav.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setDrawer(false)}
                className="group flex items-start gap-4 border-b border-line-soft py-4 transition-colors duration-200 hover:text-gray"
              >
                <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.14em] text-gray">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="link-underline flex-1 font-display text-lg font-semibold">
                  {item.label}
                </span>
                <ArrowIcon className="mt-2 text-gray transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            ))}
          </nav>
          <div className="border-t border-line px-5 py-5">
            <p className="font-mono text-[0.5625rem] tracking-[0.14em] text-gray uppercase">
              {site.location}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-2 inline-block text-[0.8125rem] transition-colors duration-200 hover:text-gray"
            >
              {site.email}
            </a>
            <ActionLink href="#admissions" className="mt-5 w-full">
              Apply to Xeeb
            </ActionLink>
          </div>
        </div>
      </header>
    </>
  );
}
