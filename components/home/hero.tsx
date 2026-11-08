"use client";

import { SectionLink as Link } from "@/components/site/section-link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { HeroProduct } from "./hero-product";
import { products } from "@/lib/products";
import { hero } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<"one" | "buds">("one");
  const product = products.find((item) => item.slug === selected)!;
  const specifications = selected === "one"
    ? ["Grade 5 titanium", "7.6 mm", "178 g"]
    : product.specs.filter((spec) => ["Driver", "Playback", "Charging"].includes(spec.label)).map((spec) => spec.value);
  const phoneStageRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance timeline using GSAP
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".hero-title-line", { opacity: 0, y: 30 });
      gsap.set(".hero-subtext", { opacity: 0, y: 20 });
      gsap.set(".hero-actions > *", { opacity: 0, y: 16 });
      gsap.set(".hero-spec", { opacity: 0, y: 12, stagger: 0.06 });

      // Master timeline
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 },
      )
        .to(
          ".hero-title-line",
          { opacity: 1, y: 0, stagger: 0.12, duration: 1.1 },
          "-=0.4",
        )
        .to(
          ".hero-subtext",
          { opacity: 1, y: 0, duration: 1 },
          "-=0.7",
        )
        .to(
          ".hero-actions > *",
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.9 },
          "-=0.5",
        )
        .to(
          ".hero-spec",
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.8 },
          "-=0.3",
        );

      // Phone entrance (handled by PhoneCanvas via ref)
    }, phoneStageRef);

    return () => ctx.revert();
  }, [reduced]);

  // Subtle atmospheric background movement
  useEffect(() => {
    if (reduced) return;
    const beam = document.querySelector(".hero-beam") as HTMLElement;
    const horizon = document.querySelector(".hero-horizon") as HTMLElement;
    if (!beam || !horizon) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      beam.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(13deg)`;
      horizon.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0) scaleX(1)`;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced]);

  return (
    <section
      ref={phoneStageRef}
      className="theme-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--paper)] text-[var(--ink)]"
    >
      {/* Atmospheric background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--paper),black_18%)_0%,var(--paper)_34%,var(--paper)_76%,color-mix(in_oklch,var(--paper),black_28%)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:repeating-linear-gradient(90deg,transparent_0,transparent_calc(8.333%-1px),color-mix(in_oklch,var(--ink),transparent_97%)_calc(8.333%-1px),color-mix(in_oklch,var(--ink),transparent_97%)_8.333%)]" />

      {/* Cinematic light beam */}
      <div
        className="hero-beam pointer-events-none absolute left-[54%] top-[-16%] h-[132%] w-[16%] -translate-x-1/2 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--ink),transparent_88%)_22%,color-mix(in_oklch,var(--ink),transparent_72%)_48%,color-mix(in_oklch,var(--accent),transparent_88%)_72%,transparent_100%)] blur-[18px] opacity-0"
        style={{
          transition: "opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 200ms linear",
        }}
        aria-hidden="true"
      />

      {/* Ground horizon glow */}
      <div
        className="hero-horizon pointer-events-none absolute bottom-[7%] left-1/2 h-[3.2rem] w-[92%] max-w-[34rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--accent),transparent_82%)_0%,transparent_66%)] opacity-0"
        style={{
          transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 200ms linear",
          transformOrigin: "center",
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 grid flex-1 grid-cols-12 items-center gap-y-8 pb-12 pt-28 lg:pb-10 lg:pt-24">
        <div className="col-span-12 min-w-0 flex flex-col items-start lg:col-span-5 lg:pb-10">
          <p className="hero-badge text-[0.82rem] font-medium text-[var(--muted)]">
            <span className="inline-block" data-carousel-copy>{product.name}</span>
          </p>
          <h1 className="mt-6 max-w-full text-[clamp(2.9rem,14vw,3.4rem)] lg:text-[clamp(3.4rem,6.6vw,6.4rem)] font-[460] leading-[0.93] tracking-[-0.05em]">
            <span className="hero-title-line block">
              {hero.title[0]}
            </span>
            <span className="hero-title-line block">
              {hero.title[1]}
            </span>
          </h1>
          <p className="hero-subtext grid mt-8 max-w-[34ch] text-[1.05rem] leading-[1.55] text-[var(--ink-2)]">
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">{products[1].summary}</span>
            <span className="col-start-1 row-start-1 block" data-carousel-copy>{selected === "one" ? "A phone built around absence: one pane, one rail, a back you can see through." : product.summary}</span>
          </p>
          <div data-carousel-copy className="hero-actions mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={selected === "one" ? hero.primary.href : "#collection"} className="hero-btn btn btn-primary px-7">
              {selected === "one" ? hero.primary.label : "Explore BUDS"}
            </Link>
            <Link
              href={hero.secondary.href}
              className="hero-btn inline-flex min-h-11 items-center text-[0.94rem] font-medium text-[var(--ink-2)] underline decoration-[var(--rule)] decoration-1 underline-offset-[0.35em] transition-colors duration-200 hover:text-[var(--ink)] hover:decoration-[var(--accent)]"
            >
              {hero.secondary.label}
            </Link>
          </div>
        </div>

        <div className="relative col-span-12 min-h-[46svh] sm:min-h-[54svh] lg:col-span-7 lg:min-h-[68svh]">
          <HeroProduct selected={selected} onSelect={setSelected} contentRef={phoneStageRef} />

          <div className="hero-spec pointer-events-none mt-3 text-center lg:absolute lg:bottom-10 lg:right-0 lg:mt-0 lg:text-right">
            <div data-carousel-copy>{specifications.map((spec) => <p key={spec} className="mt-1 text-[0.78rem] text-[var(--muted)]">{spec}</p>)}</div>
          </div>
        </div>
      </div>

      <div className="shell relative z-10 border-t border-[var(--rule)]">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5">
          <p className="text-[0.75rem] text-[var(--muted)]">
            Concept study · no product is for sale
          </p>
          <p className="text-[0.75rem] text-[var(--muted)]">
            Scroll to see the object in full
          </p>
        </div>
      </div>
    </section>
  );
}
