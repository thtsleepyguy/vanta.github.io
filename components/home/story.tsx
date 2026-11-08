"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductImage } from "@/components/product/product-image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Story() {
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineTwoRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current || !pinRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop: pinned scroll with headline transition
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const pinEl = pinRef.current!;

        // Pin the inner container (not the section) - section provides natural height
        ScrollTrigger.create({
          trigger: pinEl,
          start: "top top",
          end: "+=100%",
          invalidateOnRefresh: true, // Pin for 1 viewport height of scroll
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Initial state - both headlines stacked, first visible, second hidden below
        gsap.set(headlineRef.current, { opacity: 1, y: 0 });
        gsap.set(headlineTwoRef.current, { opacity: 0, y: 40 });
        gsap.set(descriptionRef.current, { opacity: 1, y: 0 });

        // Main timeline scrubbed to scroll progress (0 to 1)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: "+=100%",
          invalidateOnRefresh: true,
            scrub: 0.8, // Slight smoothing for readability
          },
        });

        // 0% - 35%: Hold first headline + description
        tl.to({}, { duration: 0.35 });

        // 35% - 65%: Fade headlines sequentially + swap description
        tl.to(headlineRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.15,
          ease: "expo.in",
        })
          .to(
            headlineTwoRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.15,
              ease: "expo.out",
            },
            ">",
          )
          .to(
            descriptionRef.current,
            {
              opacity: 0,
              y: -20,
              duration: 0.25,
              ease: "expo.in",
            },
            0.4, // Preserve the paragraph fade timing.
          )
          .to(
            descriptionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "expo.out",
            },
            "+=0.05",
          );

        // 65% - 100%: Hold second headline
        tl.to({}, { duration: 0.35 });

        // Description text swap at cross-fade midpoint (50%)
        ScrollTrigger.create({
          trigger: pinEl,
          start: "50% top",
          onToggle: (self) => {
            if (descriptionRef.current) {
              if (self.isActive) {
                descriptionRef.current.textContent =
                  "A single rail. A translucent back. Titanium forged to exacting tolerances. No compromise on feel, weight, or integrity. Every choice deliberate.";
              } else {
                descriptionRef.current.textContent =
                  "Minimalism is not subtraction for its own sake. Grade 5 titanium, a single translucent back, one uninterrupted rail. Every millimeter earned its place through iteration — nothing added, nothing hidden. The object recedes so intention remains.";
              }
            }
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    // Mobile and reduced-motion: simple scroll-triggered reveals (no pin)
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      const ctx = gsap.context(() => {
        gsap.set([headlineRef.current, descriptionRef.current], {
          opacity: 0,
          y: 30,
        });

        if (headlineTwoRef.current) {
          gsap.set(headlineTwoRef.current, { opacity: 0, y: 40 });
        }

        // First headline + description
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.8,
            once: true,
          },
        })
          .to(headlineRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
          })
          .to(
            descriptionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
            },
            "-=0.6",
          );

      }, sectionRef);

      return () => ctx.revert();
    });

    let cancelled = false;
    let refreshFrame = 0;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };
    void document.fonts.ready.then(() => { if (!cancelled) refresh(); });
    window.addEventListener("orientationchange", refresh);

    return () => {
      cancelled = true;
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("orientationchange", refresh);
      mm.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="theme-dark relative isolate min-h-screen bg-[var(--paper)] text-[var(--ink)]"
      aria-labelledby="story-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--paper),black_6%)_50%,transparent_100%)]" />
      
      {/* Pinned inner container - only this part gets pinned */}
      <div
        ref={pinRef}
        className="shell relative grid min-h-svh grid-cols-12 items-start gap-y-10 py-16 lg:h-screen lg:gap-y-16 lg:py-[12vh]"
      >
        <div className="col-span-12 lg:col-span-5 lg:pr-8">
          {/* Headlines - cross-fade in same position using relative container */}
          <div className="relative grid min-h-[5.5rem] mb-8">
            <h2
              ref={headlineRef}
              id="story-title"
              className="text-display-s font-[460] leading-[0.98] tracking-[-0.04em] will-change-transform will-change-opacity col-start-1 row-start-1 self-start"
            >
              Engineered to disappear.
            </h2>
            <h2
              ref={headlineTwoRef}
              className="hidden opacity-0 lg:block text-display-s font-[460] leading-[0.98] tracking-[-0.04em] will-change-transform will-change-opacity col-start-1 row-start-1 self-start"
              aria-hidden="true"
            >
              Every detail. Deliberate.
            </h2>
          </div>
          <p
            ref={descriptionRef}
            className="max-w-[38ch] text-body leading-[1.6] text-[var(--ink-2)] will-change-transform will-change-opacity"
          >
            Minimalism is not subtraction for its own sake. Grade 5 titanium, a single
            translucent back, one uninterrupted rail. Every millimeter earned its place
            through iteration — nothing added, nothing hidden. The object recedes so
            intention remains.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <ProductImage src="/images/vanta/one-frame.webp" alt="VANTA ONE titanium frame, curved upper corner and side controls" className="aspect-[4/3] max-h-[70vh] rounded-2xl border border-[var(--rule)]" />
        </div>
      </div>
    </section>
  );
}