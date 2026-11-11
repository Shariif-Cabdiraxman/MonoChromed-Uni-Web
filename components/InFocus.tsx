"use client";

import Image from "next/image";
import { campusPhotos } from "@/lib/data";
import { basePath } from "@/lib/site";
import { ActionLink, Container, Reveal, SectionHeader } from "./ui";

export function InFocus() {
  return (
    <section
      id="in-focus"
      className="py-[length:var(--space-section)]"
      aria-labelledby="in-focus-h"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="The university"
            title="The university, in focus."
            id="in-focus-h"
            description="A small selection of public-domain photography from the places and disciplines that shape teaching and research at Xeeb, reproduced in black and white to match the house palette."
            aside={
              <ActionLink
                href={`${basePath}/images/CREDITS.md`}
                variant="text"
              >
                Image credits
              </ActionLink>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {campusPhotos.map((photo, i) => (
            <Reveal key={photo.slug} delay={i * 40}>
              <figure className="group h-full bg-paper">
                <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                  <Image
                    src={`${basePath}/images/${photo.slug}.jpg`}
                    alt={`${photo.caption} (${photo.topic})`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-3 font-mono text-[0.5625rem] tracking-[0.16em] text-paper/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="border-t border-line p-5">
                  <span className="font-mono text-[0.5625rem] tracking-[0.16em] text-gray uppercase">
                    {photo.topic}
                  </span>
                  <p className="mt-2 text-[0.875rem] leading-[1.6] text-ink">
                    {photo.caption}
                  </p>
                  <p className="mt-1 font-mono text-[0.5625rem] tracking-[0.08em] text-gray">
                    {photo.credit}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-2xl font-mono text-[0.625rem] leading-[1.8] tracking-[0.04em] text-gray">
          All photographs are public domain or CC0. Sources and licences are
          listed in{" "}
          <a
            href={`${basePath}/images/CREDITS.md`}
            className="link-underline text-ink"
          >
            CREDITS.md
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
