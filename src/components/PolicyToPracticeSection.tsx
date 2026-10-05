import { useEffect, useRef } from 'react';

interface PolicyToPracticeSectionProps {
  onExploreApproach: () => void;
}

const steps = [
  {
    number: '01',
    title: 'See the whole system',
    description: 'Start with the people, institutions, incentives and evidence shaping the challenge.',
  },
  {
    number: '02',
    title: 'Shape a useful response',
    description: 'Bring policy thinking, research and practical delivery into one clear direction.',
  },
  {
    number: '03',
    title: 'Make the next move matter',
    description: 'Turn insight into decisions, action and learning that can guide what comes next.',
  },
];

export function PolicyToPracticeSection({ onExploreApproach }: PolicyToPracticeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    let revertAnimations = () => {};

    const initializeMotion = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia(section);
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const cards = section.querySelectorAll<HTMLElement>('[data-story-step]');
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.14,
              scrollTrigger: { trigger: section, start: 'top 78%', once: true },
            },
          );
        });
        revertAnimations = () => media.revert();
      } catch {
        // The section remains fully readable when animation code is unavailable.
      }
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            void initializeMotion();
          }
        },
        { rootMargin: '180px 0px' },
      );
      observer.observe(section);
    } else {
      void initializeMotion();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      revertAnimations();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="policy-to-practice"
      aria-labelledby="policy-to-practice-title"
      className="relative isolate overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-[#ff7e67]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--coral)]">
            IP3 / Policy to practice
          </p>
          <h2
            id="policy-to-practice-title"
            className="mt-5 max-w-xl text-4xl leading-[1.06] tracking-[-0.045em] text-[var(--white)] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Good ideas are only the beginning.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            We connect policy analysis, action research and management consulting to help turn complex questions into a clear next move.
          </p>

          <div className="relative mt-9 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] sm:mt-12">
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#ff7e67]/[0.08] via-transparent to-sky-400/[0.06]" />
            <img
              src="/assets/ip3-working-session.png"
              alt="Colleagues gathered around a table for a working session"
              loading="lazy"
              decoding="async"
              className="relative block h-auto w-full scale-[1.2] rounded-2xl"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)]">
            A practical path through complexity
          </p>
          <ol className="space-y-3 sm:space-y-4">
            {steps.map((step) => (
              <li
                key={step.number}
                data-story-step
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-colors duration-200 hover:border-[#ff7e67]/50 sm:p-7"
              >
                <div className="flex gap-4 sm:gap-6">
                  <span className="pt-1 font-mono text-sm tracking-wide text-[var(--coral)]" aria-hidden="true">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-[var(--white)] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={onExploreApproach}
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--white)] transition-colors hover:border-[var(--coral)] hover:text-[var(--coral)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--coral)]"
          >
            Explore our approach <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
