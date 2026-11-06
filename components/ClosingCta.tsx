import { site } from "@/lib/site";
import { ActionLink, Container } from "./ui";

export function ClosingCta() {
  return (
    <section id="apply" className="border-t border-ink bg-ink text-paper">
      <Container>
        <div className="grid gap-10 py-[length:var(--space-section)] lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-[0.625rem] tracking-[0.16em] text-paper/60 uppercase">
              Admissions / 2027 intake
            </p>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.045em] text-balance">
              Your next chapter starts on the coast.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-sm text-[0.9375rem] leading-[1.75] text-paper/70 lg:ml-auto">
              Applications for the 2027 intake open in November. Talk to the
              admissions office, book a campus visit or explore programmes
              online.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
              <ActionLink href="#admissions" variant="paper">
                Start an application
              </ActionLink>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center border border-paper/30 px-5 py-3.5 font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-paper uppercase transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                Ask a question
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
